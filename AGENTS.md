# policy-meta-spec AGENTS Map

这个文件只做导航。规范事实写在 `README.md`、`SPEC.md` 和 `docs/`。

## 先看哪里

- 外部概览：`README.md`
- 核心规范：`SPEC.md`
- 文档入口：`docs/README.md`
- 文档系统地图：`docs/docs-system-map.md`
- 系统边界：`docs/architecture/system-boundaries.md`
- 源码布局：`docs/architecture/source-layout.md`

## 修改规则

- canonical 字段、alias、稳定性规则变化时，更新 `SPEC.md` 与 `docs/`。
- schema / bindings / Rust types 归属变化时，更新 `docs/architecture/source-layout.md`。
- `AGENTS.md` 保持短小，不承载规范正文。

## 验证

- `./scripts/check-docs-system.sh`
- `(cd rust/policy-meta && cargo run --locked --bin export-artifacts -- --check)`
- `(cd rust/policy-meta && cargo test --locked)`
- `python scripts/validate_spec.py`
