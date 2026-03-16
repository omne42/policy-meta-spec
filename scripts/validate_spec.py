#!/usr/bin/env python3

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator, ValidationError


REPO_ROOT = Path(__file__).resolve().parents[1]
SCHEMA_DIR = REPO_ROOT / "schema"
PROFILES_DIR = REPO_ROOT / "profiles"
DOCS_DIR = REPO_ROOT / "docs"


def load_yaml(path: Path) -> object:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def load_validator(path: Path) -> Draft202012Validator:
    schema = load_yaml(path)
    return Draft202012Validator(schema)


def ensure_valid(
    validator: Draft202012Validator,
    instance: object,
    label: str,
) -> None:
    errors = sorted(validator.iter_errors(instance), key=lambda err: list(err.path))
    if errors:
        raise AssertionError(format_validation_errors(label, errors))


def ensure_invalid(
    validator: Draft202012Validator,
    instance: object,
    label: str,
) -> None:
    errors = list(validator.iter_errors(instance))
    if not errors:
        raise AssertionError(f"{label}: expected validation failure")


def format_validation_errors(label: str, errors: list[ValidationError]) -> str:
    rendered = [f"{label}: validation failed"]
    for err in errors:
        path = ".".join(str(part) for part in err.path) or "<root>"
        rendered.append(f"  - {path}: {err.message}")
    return "\n".join(rendered)


def extract_yaml_blocks(path: Path) -> list[object]:
    text = path.read_text(encoding="utf-8")
    blocks = re.findall(r"```yaml\n(.*?)\n```", text, flags=re.DOTALL)
    return [yaml.safe_load(block) for block in blocks]


def validate_fragment_contract() -> None:
    validator = load_validator(SCHEMA_DIR / "policy-meta.v1.json")

    ensure_valid(
        validator,
        {
            "risk_profile": "standard",
            "write_scope": "workspace_write",
        },
        "fragment without version",
    )
    ensure_valid(
        validator,
        {
            "version": 1,
            "risk_profile": "standard",
            "write_scope": "workspace_write",
            "execution_isolation": "best_effort",
            "decision": "prompt",
        },
        "fragment with version",
    )
    ensure_invalid(
        validator,
        {
            "risk_profile": "standard",
            "unknown_field": True,
        },
        "fragment with unknown key",
    )


def validate_profile_artifacts() -> None:
    validator = load_validator(SCHEMA_DIR / "policy-profile.v1.json")

    for profile_path in sorted(PROFILES_DIR.glob("*.yaml")):
        ensure_valid(validator, load_yaml(profile_path), profile_path.name)

    quickstart_path = DOCS_DIR / "getting-started" / "quickstart.md"
    yaml_blocks = extract_yaml_blocks(quickstart_path)
    matching_blocks = [
        block for block in yaml_blocks if isinstance(block, dict) and "risk_profile" in block
    ]

    if not matching_blocks:
        raise AssertionError(f"{quickstart_path}: no YAML policy example found")

    ensure_valid(validator, matching_blocks[0], "quickstart YAML example")


def main() -> int:
    try:
        validate_fragment_contract()
        validate_profile_artifacts()
    except AssertionError as err:
        print(err, file=sys.stderr)
        return 1

    print("policy-meta-spec validation passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
