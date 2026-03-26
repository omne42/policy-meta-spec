# System Boundaries

## Goal

`policy-meta-spec` is the canonical semantic contract for shared policy metadata.

It exists to keep naming, meaning and machine-readable artifacts aligned across repositories without coupling those repositories to one runtime implementation.

## This Repository Owns

- canonical field names and meanings
- parse-time alias rules
- versioning and stability rules
- JSON Schema artifacts
- TypeScript bindings
- baseline profile examples
- minimal Rust types crate used to export synchronized artifacts

## This Repository Does Not Own

- runtime policy engines
- sandbox implementations
- transport APIs
- product-specific approval workflows

## Relationship To Other Repositories

- `omne-runtime/omne-execution-gateway`
  - consumes policy semantics, but does not define them here.
- `omne-agent`
  - reuses canonical values such as `write_scope` and `execution_isolation`.
- `safe-fs-tools`
  - reuses the same semantic vocabulary.

## Boundary Rule

If a change alters the meaning of a canonical token, it belongs here.

If a change only alters how one product interprets or enforces that token at runtime, it belongs in that product or runtime repository instead.
