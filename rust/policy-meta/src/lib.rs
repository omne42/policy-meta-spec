use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Copy, Debug, Eq, PartialEq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "snake_case")]
pub enum RiskProfile {
    Safe,
    Standard,
    Proactive,
    #[serde(alias = "yolo")]
    Danger,
}

impl RiskProfile {
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::Safe => "safe",
            Self::Standard => "standard",
            Self::Proactive => "proactive",
            Self::Danger => "danger",
        }
    }
}

#[derive(Clone, Copy, Debug, Eq, PartialEq, Serialize, Deserialize, JsonSchema, TS, Default)]
#[serde(rename_all = "snake_case")]
pub enum WriteScope {
    #[default]
    ReadOnly,
    #[serde(alias = "workspace")]
    WorkspaceWrite,
    #[serde(alias = "global", alias = "unrestricted")]
    FullAccess,
}

impl WriteScope {
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::ReadOnly => "read_only",
            Self::WorkspaceWrite => "workspace_write",
            Self::FullAccess => "full_access",
        }
    }

    pub const fn allows_write(self) -> bool {
        matches!(self, Self::WorkspaceWrite | Self::FullAccess)
    }
}

#[derive(
    Clone, Copy, Debug, Eq, PartialEq, PartialOrd, Ord, Serialize, Deserialize, JsonSchema, TS,
)]
#[serde(rename_all = "snake_case")]
pub enum ExecutionIsolation {
    None,
    BestEffort,
    Strict,
}

impl ExecutionIsolation {
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::None => "none",
            Self::BestEffort => "best_effort",
            Self::Strict => "strict",
        }
    }
}

#[derive(Clone, Copy, Debug, Eq, PartialEq, Serialize, Deserialize, JsonSchema, TS)]
#[serde(rename_all = "snake_case")]
pub enum Decision {
    Allow,
    Prompt,
    PromptStrict,
    Deny,
}

impl Decision {
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::Allow => "allow",
            Self::Prompt => "prompt",
            Self::PromptStrict => "prompt_strict",
            Self::Deny => "deny",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn risk_profile_accepts_yolo_alias() {
        let parsed: RiskProfile = serde_json::from_str("\"yolo\"").expect("parse yolo alias");
        assert_eq!(parsed, RiskProfile::Danger);
    }

    #[test]
    fn write_scope_accepts_aliases() {
        let workspace: WriteScope = serde_json::from_str("\"workspace\"").expect("workspace");
        let global: WriteScope = serde_json::from_str("\"global\"").expect("global");
        let unrestricted: WriteScope =
            serde_json::from_str("\"unrestricted\"").expect("unrestricted");

        assert_eq!(workspace, WriteScope::WorkspaceWrite);
        assert_eq!(global, WriteScope::FullAccess);
        assert_eq!(unrestricted, WriteScope::FullAccess);
    }

    #[test]
    fn canonical_serialization_uses_normalized_values() {
        let danger = serde_json::to_string(&RiskProfile::Danger).expect("serialize danger");
        let full = serde_json::to_string(&WriteScope::FullAccess).expect("serialize full");

        assert_eq!(danger, "\"danger\"");
        assert_eq!(full, "\"full_access\"");
    }
}
