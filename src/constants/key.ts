import { ContentId, ContentKind } from "../types/common";

export const token_keys = {
    access_token: "access_token",
    refresh_token: "refresh_token",
    device_token: "device_token",
};

export const api_path_keys = {
    SIGN_IN: () => "/auth/sign_in",
    SIGN_UP: () => "/auth/sign_up",
    SIGN_OUT: () => "/auth/sign_out",
    DEVICE_HANDSHAKE: () => "/auth/device_handshake",
    CHECK_API: () => "/auth/check_api",
    CONTENT_BY_ID: (content_kind: ContentKind, content_id: ContentId) =>
        `/contents/${content_kind}/${content_id}`,
    CONTENT_LIST: (content_kind: ContentKind) =>
        `/contents/${content_kind}/list`,
    CONTENT_SEARCH: (content_kind: ContentKind) =>
        `/contents/${content_kind}/search`,
};
