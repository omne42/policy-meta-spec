# Governance and Versioning

## Stability Rules

- existing canonical values are immutable in meaning,
- backward-incompatible rename/removal requires major version bump,
- additive evolution is preferred.

## Change Categories

| Change | Compatibility | Typical release action |
| --- | --- | --- |
| New field | additive | minor release + docs update |
| New enum value | additive but behavior-sensitive | minor release + integration notice |
| Rename/removal | breaking | major version + migration guide |
| New alias | parse-time compatibility enhancement | minor release |

## Consumer Guidance

- pin to a known spec version in production,
- validate upgrades with real traces,
- keep rollback path available.
