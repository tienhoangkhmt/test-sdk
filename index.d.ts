/**
 * Type definitions for @mptransformation/omisdk
 * For use with ESLint in ReactJS projects
 */

declare module "@mptransformation/omisdk" {
  /**
   * Configuration options for the SDK
   */
  export interface SDKOptions {
    /** Target element ID where the SDK will be mounted */
    targetElementId?: string;
    /** Display mode for the SDK: 'none' (headless) or 'bubble' (UI visible) */
    mode?: SDKMode;
    /** Custom theme for the SDK */
    theme?: SDKTheme;
    /** Socket URL for real-time communication */
    baseUrl?: string;
    /** Debug mode flag */
    debug?: boolean;
    /** The remote audio media stream is attached to this element ID. */
    remoteAudioId?: string[];
    /** HTML elements ID for local media streams. */
    localVideoId?: string;
    /** The remote video media stream is attached to this element ID. */
    remoteVideoId?: string[];
    /** clear all saved info when init if true, default false */
    forceNew?: boolean;
    /** Delegate for the SDK */
    delegate?: RequestDelegate;
  }

  /**
   * SDK display modes
   */
  export type SDKMode = "none" | "bubble";

  /**
   * Theme options for customizing the SDK appearance
   */
  export interface SDKTheme {
    /** Primary color */
    primaryColor?: string;
    /** Secondary color */
    secondaryColor?: string;
    /** Text color */
    textColor?: string;
    /** Background color */
    backgroundColor?: string;
    /** Font family */
    fontFamily?: string;
    /** Border radius for elements */
    borderRadius?: string;
    /** Bubble position (for bubble mode) */
    bubblePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    /** Custom CSS classes */
    customClasses?: Record<string, string>;
  }

  /**
   * Action event data
   */
  export interface SDKAction {
    /** Type of action */
    type: string;
    /** Payload data for the action */
    payload?: any;
    /** Timestamp when the action occurred */
    timestamp: number;
  }

  /**
   * Socket event data
   */
  export interface SocketEvent {
    /** Event name */
    name: string;
    /** Event data */
    data?: any;
    /** Timestamp when the event occurred */
    timestamp: number;
  }

  /**
   * Socket connection states
   */
  export enum SocketConnectionState {
    DISCONNECTED = "disconnected",
    CONNECTING = "connecting",
    CONNECTED = "connected",
    RECONNECTING = "reconnecting",
    RECONNECTION_FAILED = "reconnection_failed",
    NETWORK_ERROR = "network_connection_failed",
  }

  /**
   * Socket options for configuration
   */
  export interface SocketOptions {
    /** Whether to enable reconnection */
    reconnection?: boolean;
    /** Maximum number of reconnection attempts */
    reconnectionAttempts?: number;
    /** Delay between reconnection attempts in milliseconds */
    reconnectionDelay?: number;
    /** Connection timeout in milliseconds */
    timeout?: number;
    /** Whether to connect automatically on initialization */
    autoConnect?: boolean;
  }

  /**
   * Event emitter interface
   */
  export interface EventEmitter {
    /** Subscribe to an event */
    on(eventName: string, callback: (data: any) => void): void;
    /** Unsubscribe from an event */
    off(eventName: string, callback: (data: any) => void): void;
    /** Emit an event */
    emit(eventName: string, data: any): void;
  }

  export interface LoginRequest {
    tenantId: number;
    username: string;
    password: string;
  }

  export interface LoginSSORequest {
    ssoToken: string;
    organization: string;
  }

  export interface SdkResponse {
    success: boolean;
    message: string;
    data?: any;
  }

  export interface CallOptions {
    did?: string;
    enableVideo?: boolean;
    remoteVideoId?: string;
    localVideoId?: string;
    extraInfo?: string;
  }

  export interface RequestDelegate {
    onAccept?: (sessionId: string, record?: any) => void;
    onHangup?: (sessionId: string, record?: any) => void;
  }

  export enum PlatformType {
    WEB = "WEB",
    MOBILE = "MOBILE",
    DESKTOP = "DESKTOP",
    TABLET = "TABLET",
    PWA = "PWA",
  }

  export interface SdkEvent {
    name: string;
    type?: any;
    timestamp: number;
  }

  export enum CallEventType {
    CALL_INCOMING = "call_incoming",
    CALL_OUTGOING = "call_outgoing",
    CALL_HANGUP = "call_hangup",
    CALL_ANSWERED = "call_answered",
    CALL_REJECTED = "call_rejected",
    CALL_HOLD = "call_hold",
    CALL_UNHOLD = "call_unhold",
    CALL_MUTE = "call_mute",
    CALL_UNMUTE = "call_unmute",
    CALL_TRANSFER = "call_transfer",
    CALL_CONNECTED = "call_connected",
    CALL_CLOSE_CONVERSATION = "call_close_conversation",
    CALL_REFUSE_TRANSFER = "call_refuse_transfer",
    CALL_ACCEPT_TRANSFER = "call_accept_transfer",
    CALL_TRANSFER_FAILED = "call_transfer_failed",
    CALL_TRANSFER_RINGING = "call_transfer_ringing",
    CALL_TRANSFER_ANSWER = "call_transfer_answer",
    CALL_TRANSFER_ACCEPTED = "call_transfer_accepted",
    CALL_TERMINATED_OR_IVR_MISSED = "call_terminated_or_ivr_missed",
    CALL_CROSS_PLATFORM = "call_cross_platform",
    CALL_RECORDING = "call_recording",
    SNAPSHOT_SUCCESS = "snapshot_success",
    SNAPSHOT_ERROR = "snapshot_error",
  }

  export interface CallEvent extends SdkEvent {
    type: CallEventType;
    senderId: string;
    applicationId: string;
    channel?: string;
    direction?: string;
    hangupBy?: string;
    statusCode?: string;
    sessionId?: string;
  }

  export enum AgentStatusEventType {
    AGENT_STATUS_CHANGE = "agent_status_change",
  }

  export interface AgentStatusEvent extends SdkEvent {
    type: AgentStatusEventType;
    status: string;
    agentId: string;
    tenantId: string;
    changeTime: number;
    reasonCode: string;
    reasonCodeId: number;
  }

  export enum AppEventType {
    READY = "ready",
    DISPLAY_CHANGED = "display_changed",
    BUBBLE_HIDDEN = "bubble_hidden",
    BUBBLE_SHOWN = "bubble_shown",
    LOGGED_IN = "logged_in",
    LOGGED_OUT = "logged_out",
    TOKEN_EXPIRED = "token_expired",
    ERROR = "error",
    PERMISSION_DENIED = "permission_denied",
    NETWORK_ERROR = "network_error",
    DISCONNECTED = "disconnected",
    CONNECTED = "connected",
    DISCONNECTED_WEB_SOCKET = "disconnected_web_socket",
    CONNECTED_WEB_SOCKET = "connected_web_socket",
    AUTO_CONNECT = "auto_connect",
    NOT_AUTO_CONNECT = "not_auto_connect",
    FORCE_LOGOUT = "force_logout",
  }
  export interface AppEvent extends SdkEvent {
    type: AppEventType;
    message: string;
    error?: Error;
  }

  export interface InteractionEvent extends SdkEvent, ConversationMessage {
    type: InteractionEventType;
  }

  export enum InteractionEventType {
    NEW_CONVERSATION = "new_conversation",
    NEW_MESSAGE = "new_message",
    CLOSE_CONVERSATION = "close_conversation",
    MESSAGE_RECEIVED = "message_received",
    MESSAGE_SENT = "message_sent",
    MESSAGE_DELIVERED = "message_delivered",
    MESSAGE_READ = "message_read",
    CONVERSATION_ENDED = "conversation_ended",
  }

  export enum DestinationType {
    AGENT = "AGENT",
    QUEUE = "QUEUE",
    EXTERNAL = "EXTERNAL",
  }

  export enum TransferType {
    BLIND_TRANSFER = "BLIND_TRANSFER",
    ATTENDED_TRANSFER = "ATTENDED_TRANSFER",
  }

  export type UserInfo = {
    tenantId?: number;
    userId: number;
    userName: string;
    fullName: string;
    extension?: string;
  };

  export interface CallAnswerOptions extends CallOptions {
    requestDelegate?: RequestDelegate;
  }

  export interface DelegateAddConfluenceVideo {
    onSuccess: (extension: string) => void;
    onFailure: (extension: string) => void;
  }

  export enum ListResultInteractionEnum {
    SUCCESS = "SUCCESS",
    CANNOT_RESOLVED = "CANNOT_RESOLVED",
    FAILURE = "FAILURE",
  }

  export type MessageAttachment = {
    fileName?: string;
    originalname?: string;
    link?: string;
    encoding?: string;
    type?: string;
    size?: number;
  };

  export type sessionItemChat = {
    _id: string;
    channel: string;
    conversationId: string;
    senderId: string;
    applicationId: string;
    applicationName: string;
    cloudTenantId: number;
    messageStatus: string;
    messageType: string;
    messageFrom: string;
    sendFrom: string;
    text: string;
    senderName: string;
    socialMessageId: string;
    receivedTime: string | Date;
    __v: number;
    uuid?: string;
    receivedId?: string;
    attachment?: MessageAttachment[];
    startedBy?: string;
    isAnimation?: boolean;
    taskId?: string;
    taskCode?: string;
  };

  export type TSession = {
    __v: number;
    _id: string;
    agentPicked: number;
    applicationId: string;
    applicationName: string;
    channel: string;
    closeTime?: string | Date;
    closedTime?: string | Date;
    cloudTenantId: number;
    conversationId: string;
    conversationState: string;
    lastMessage: string;
    lastTime: string | Date;
    messages: sessionItemChat[];
    participants: [string, number];
    senderId: string;
    senderName: string;
    startedTime: string | Date;
    isClient?: boolean;
    conversationBusinessResult?: ListResultInteractionEnum | null | undefined;
    recordPaths?: string[];
    tags?: any[];
  };

  export type RecordAttachments = Array<{
    id: string;
    link: string;
    name: string;
    type: string;
  }>;

  /**
   * {@link Session} state.
   *
   * @remarks
   * The {@link Session} behaves in a deterministic manner according to the following
   * Finite State Machine (FSM).
   * ```txt
   *                   ___________________________________________________________
   *                  |  ____________________________________________             |
   *                  | |            ____________________________    |            |
   * Session          | |           |                            v   v            v
   * Constructed -> Initial -> Establishing -> Established -> Terminating -> Terminated
   *                                |               |___________________________^   ^
   *                                |_______________________________________________|
   * ```
   * @public
   */
  export enum SessionState {
    /**
     * If `Inviter`, INVITE not sent yet.
     * If `Invitation`, received INVITE (but no final response sent yet).
     */
    Initial = "Initial",
    /**
     * If `Inviter`, sent INVITE and waiting for a final response.
     * If `Invitation`, received INVITE and attempting to send 200 final response (but has not sent it yet).
     */
    Establishing = "Establishing",
    /**
     * If `Inviter`, sent INVITE and received 200 final response and sent ACK.
     * If `Invitation`, received INVITE and sent 200 final response.
     */
    Established = "Established",
    /**
     * If `Inviter`, sent INVITE, sent CANCEL and now waiting for 487 final response to ACK (or 200 to ACK & BYE).
     * If `Invitation`, received INVITE, sent 200 final response and now waiting on ACK and upon receipt will attempt BYE
     * (as the protocol specification requires, before sending a BYE we must receive the ACK - so we are waiting).
     */
    Terminating = "Terminating",
    /**
     * If `Inviter`, sent INVITE and received non-200 final response (or sent/received BYE after receiving 200).
     * If `Invitation`, received INVITE and sent non-200 final response (or sent/received BYE after sending 200).
     */
    Terminated = "Terminated",
  }

  export interface CaptureSnapshotOptions {
    /** Session ID to capture snapshot from */
    sessionId?: string;
    /** Image format: 'png' | 'jpeg' | 'webp' */
    format?: "png" | "jpeg" | "webp";
    /** Image quality for jpeg/webp (0-1) */
    quality?: number;
    /**
     * Remote video element ID to capture from
     * get fisrt element  in case of multiple remote video IDs
     * */
    remoteVideoId: string;
  }

  export interface CaptureSnapshotResult {
    /** Success status */
    success: boolean;
    /** Captured image data */
    data?: RecordAttachments;
    /** Error message if failed */
    error?: string;
    /** Timestamp of capture */
    timestamp: number;
  }

  /**
   * SDK instance interface
   */
  export interface SDK {
    /** Initialize the SDK with options */
    init(options?: SDKOptions): void;
    /** Login with username and password **/
    login(request: LoginRequest): Promise<SdkResponse>;
    /** Login with SSO token**/
    loginSSO(request: LoginSSORequest): Promise<SdkResponse>;
    /** Logout the current user**/
    logout(): Promise<SdkResponse>;
    /** Make a call to a destination**/
    makeCall(destination: string, options?: CallOptions): Promise<SdkResponse>;
    /** Hangup the current call**/
    hangup(): Promise<SdkResponse>;
    /** Answer an incoming call**/
    answerCall(options?: CallOptions): Promise<SdkResponse>;
    /** Reject an incoming call**/
    rejectCall(): Promise<SdkResponse>;
    /** Hold the current call**/
    hold(): Promise<SdkResponse>;
    /** Resume the current call**/
    unhold(): Promise<SdkResponse>;
    /** Mute the current call**/
    mute(): Promise<SdkResponse>;
    /** Unmute the current call**/
    unmute(): Promise<SdkResponse>;
    /** Turn on the camera**/
    cameraOn(): Promise<SdkResponse>;
    /** Turn off the camera**/
    cameraOff(): Promise<SdkResponse>;
    /** get current status of agent **/
    getCurrentStatus(): Promise<SdkResponse>;
    /** Transfer the current call to a different destination**/
    transfer(
      destination: string,
      destinationType: DestinationType,
      transferType: TransferType,
    ): void;
    /** Change the agent status**/
    changeAgentStatus(reasonCodeId: number): Promise<SdkResponse>;
    /** Get the agent status**/
    getAgentStatus(): Promise<SdkResponse>;
    /** Hide the bubble**/
    hideBubble(): Promise<SdkResponse>;
    /** Show the bubble**/
    showBubble(): Promise<SdkResponse>;
    /** Destroy the SDK instance and clean up resources */
    destroy(): void;
    /** Update SDK options */
    updateOptions(options: Partial<SDKOptions>): void;
    /** Get the current SDK version */
    getVersion(): string;
    /** Get the current SDK options */
    getOptions(): SDKOptions;
    /** Subscribe to an event */
    on(eventName: string, callback: (data: SdkEvent) => void): void;
    /** Unsubscribe from an event */
    off(eventName: string, callback: (data: SdkEvent) => void): void;
    /** Get the agent queues**/
    getAgentQueues(): Promise<SdkResponse>;
    /** Toggle the agent queue**/
    toggleAgentQueue(queueId: string, enable: boolean): Promise<SdkResponse>;
    /** close conversation of agent**/
    closeSession(): void;
    /** call internal **/
    makeCallInternal(
      destination: string,
      extraInfo?: string,
      enableVideo?: boolean,
    ): Promise<SdkResponse>;
    acceptTransfer(): void;
    refuseTransfer(): void;
    getInfo(): UserInfo;
    /** get group agents **/
    getGroupAgents(): Promise<SdkResponse>;
    /** get agent by extension **/
    getAgentByExtension(queueExtension: string): Promise<SdkResponse>;
    /** get agent by id **/
    getAgentQueuesById(queueId: string): Promise<SdkResponse>;
    customHangup(sessionId: string): void;
    switchVideo(): void;
    /** Login with token **/
    loginWithToken(token: string): Promise<SdkResponse>;
    /**
     * Join agent video call
     */
    joinVideoCall(
      extension: string,
      delegate: DelegateAddConfluenceVideo,
    ): void;

    getSessionState(sessionId: string): SessionState;

    /** Capture snapshot from remote video **/
    captureRemoteSnapshot(
      options?: CaptureSnapshotOptions,
    ): Promise<CaptureSnapshotResult>;

    /** Send a message to the current conversation */
    sendMessage(
      message: string,
      messageType: MessageType,
      attachments?: SendAttachment[],
    ): Promise<SdkResponse>;
    /**
     *
     * @param sessionId
     * get record, image, message....
     */
    getConversationBySessionId(
      sessionId: string,
    ): Promise<Partial<SdkResponse & { data?: TSession | null }>>;
  }

  // Export the OmiSDK class
  export class OmiSDK implements SDK {
    constructor(options?: SDKOptions);
    /** Initialize the SDK with options */
    init(options?: SDKOptions): void;
    /** Login with username and password **/
    login(request: LoginRequest): Promise<SdkResponse>;
    /** Login with SSO token**/
    loginSSO(request: LoginSSORequest): Promise<SdkResponse>;
    /** Logout the current user**/
    logout(): Promise<SdkResponse>;
    /** Make a call to a destination**/
    makeCall(destination: string, options?: CallOptions): Promise<SdkResponse>;
    /** Hangup the current call**/
    hangup(): Promise<SdkResponse>;
    /** Answer an incoming call**/
    answerCall(options?: CallOptions): Promise<SdkResponse>;
    /** Reject an incoming call**/
    rejectCall(): Promise<SdkResponse>;
    /** Hold the current call**/
    hold(): Promise<SdkResponse>;
    /** Resume the current call**/
    unhold(): Promise<SdkResponse>;
    /** Mute the current call**/
    mute(): Promise<SdkResponse>;
    /** Unmute the current call**/
    unmute(): Promise<SdkResponse>;
    /** Turn on the camera**/
    cameraOn(): Promise<SdkResponse>;
    /** Turn off the camera**/
    cameraOff(): Promise<SdkResponse>;
    /** get current status of agent **/
    getCurrentStatus(): Promise<SdkResponse>;
    /** Transfer the current call to a different destination**/
    transfer(
      destination: string,
      destinationType: DestinationType,
      transferType: TransferType,
    ): void;
    /** Change the agent status**/
    changeAgentStatus(reasonCodeId: number): Promise<SdkResponse>;
    /** Get the agent status**/
    getAgentStatus(): Promise<SdkResponse>;
    /** Hide the bubble**/
    hideBubble(): Promise<SdkResponse>;
    /** Show the bubble**/
    showBubble(): Promise<SdkResponse>;
    /** Destroy the SDK instance and clean up resources */
    destroy(): void;
    /** Update SDK options */
    updateOptions(options: Partial<SDKOptions>): void;
    /** Get the current SDK version */
    getVersion(): string;
    /** Get the current SDK options */
    getOptions(): SDKOptions;
    /** Subscribe to an event */
    on(eventName: string, callback: (data: SdkEvent) => void): void;
    /** Unsubscribe from an event */
    off(eventName: string, callback: (data: SdkEvent) => void): void;
    /** Get the agent queues**/
    getAgentQueues(): Promise<SdkResponse>;
    /** Toggle the agent queue**/
    toggleAgentQueue(queueId: string, enable: boolean): Promise<SdkResponse>;
    /** close conversation of agent**/
    closeSession(): void;
    /** call internal **/
    makeCallInternal(
      destination: string,
      extraInfo?: string,
      enableVideo?: boolean,
    ): Promise<SdkResponse>;
    acceptTransfer(): void;
    refuseTransfer(): void;
    getInfo(): UserInfo;
    /** get group agents **/
    getGroupAgents(): Promise<SdkResponse>;
    /** get agent by extension **/
    getAgentByExtension(queueExtension: string): Promise<SdkResponse>;
    /** get agent by id **/
    getAgentQueuesById(queueId: string): Promise<SdkResponse>;
    customHangup(sessionId: string): void;
    switchVideo(): void;
    /** Login with token **/
    loginWithToken(token: string): Promise<SdkResponse>;

    /**
     * Join agent video call
     */
    joinVideoCall(
      extension: string,
      delegate: DelegateAddConfluenceVideo,
    ): void;

    getSessionState(sessionId: string): SessionState;

    /** Capture snapshot from remote video **/
    captureRemoteSnapshot(
      options?: CaptureSnapshotOptions,
    ): Promise<CaptureSnapshotResult>;

    /** Send a message to the current conversation */
    sendMessage(
      message: string,
      messageType: MessageType,
      attachments?: SendAttachment[],
    ): Promise<SdkResponse>;

    /**
     *
     * @param sessionId
     * get record, image, message....
     */
    getConversationBySessionId(
      sessionId: string,
    ): Promise<Partial<SdkResponse & { data?: TSession | null }>>;
  }

  export type OptionInitGuest = {
    name: string;
    phone: string;
    email?: string;
  };

  interface SingleMediaID {
    remoteAudioID: string;
    remoteVideoID?: string;
  }
  /** allow multiple active sessions */
  interface MultipleMediaID {
    remoteAudioID: string[];
    remoteVideoID?: string[];
  }

  interface ScreenAndLocalMediaID {
    remoteScreenID?: string;
    localVideoID?: string;
  }

  export interface SingleMediaElement
    extends SingleMediaID, ScreenAndLocalMediaID {}
  /**
   * multiple mode,
   *
   * allow connect multiple calls at the same time
   * only support max 16 element concurrent play media
   */
  export interface MultipleMediaElement
    extends MultipleMediaID, ScreenAndLocalMediaID {}

  /** Facing mode for camera
   *
   * "environment": The camera facing away from the user (typically the rear camera on mobile devices).
   * "user": The camera facing towards the user (typically the front camera on mobile devices).
   */

  export type facingMode = "user" | "environment";
  /** Options for constructing the Guest SDK */

  export interface GuestConstructorOptions {
    /** Base URL for the guest service */
    baseUrl: string;
    /** API key for authentication */
    apiKey: string;
    /** Application ID */
    appId: string;
    /** The local video media stream is attached to this element ID. */
    mediaIds: SingleMediaElement | MultipleMediaElement;
    sdkId?: string;
  }

  export interface sendAttachment {
    id: string | number;
    // base64 string
    url: string;
    type: string;
    fileName: string;
    size: number;
  }

  export class OmiGuestSDK {
    constructor(options: GuestConstructorOptions);
    /** Initialize the Guest SDK with options */
    init(options: OptionInitGuest): void;
    /** Destroy the Guest SDK instance and clean up resources */
    destroy(): void;
    /** Get the version of the Guest SDK */
    getVersion(): string;
    /** Switch camera
     * @param facingMode - The facing mode to switch to
     * @returns A promise that resolves to a SdkResponse
     */
    switchCamera(facingMode: facingMode): Promise<SdkResponse>;
    /** Mute */
    mute(): Promise<SdkResponse>;
    /** Unmute */
    unmute(): Promise<SdkResponse>;
    /** Camera on */
    cameraOn(): void;
    /** Camera off */
    cameraOff(): void;
    /** Switch video */
    switchVideo(): Promise<SdkResponse>;
    /** Make call
     * @param phone - The phone number to call
     * @param options - The options for the call
     * @returns A promise that resolves to a SdkResponse
     */
    makeCall(phone: string, options: CallAnswerOptions): Promise<SdkResponse>;
    /**
     * Converts an ArrayBuffer to a Base64-encoded Data URI string.
     * @param buffer - The raw binary data from a file
     * @param type - The MIME type of the file (e.g. "image/png", "application/pdf")
     * @returns A Data URI string in the format `data:<type>;base64,<encoded>`
     */
    arrayBufferToBase64(buffer: ArrayBuffer, type: string): string;
    /** Send message to the conversation */
    sendMessage(message: string): void;
    /** Send attachments to the conversation */
    sendAttachments(attachments: SendAttachment[]): void;
    /**
     * Re-applies constraints to the outgoing local video track by calling `getUserMedia` with zoom, torch, and facing-mode settings.
     *
     * @param zoom - Video zoom factor (`zoom` in `MediaTrackConstraintSet`). The SDK accepts **1–4**; values outside that range are clamped to **1**.
     * @param torch - When `true`, requests the device torch/flash where supported (typically mobile). The implementation may **force the rear camera** (`environment`) so the flash can be used.
     * @param facingMode - Preferred camera: **`"user"`** — front/selfie; **`"environment"`** — rear. Default in the implementation is `"user"`.
     * @returns A promise that resolves to an {@link SdkResponse} after the new video track is applied.
     */
    senderTrackVideo(
      zoom: number,
      torch: boolean,
      facingMode: facingMode,
    ): Promise<SdkResponse>;
    /** Delete file from the conversation */
    deleteFile(id: string | Array<string>): Array<any>;
  }

  /** Identifies who sent the message in a conversation */
  export enum MessageFrom {
    /** Agent sends a message to the customer */
    AGENT = "AGENT",
    /** Customer sends a message to the agent */
    CUSTOMER = "CUSTOMER",
    /** System-generated message for specific scenarios (e.g. notifications, alerts) */
    SYSTEM = "SYSTEM",
    /** Automated bot reply */
    BOT = "BOT",
    /** AI assistant that analyzes the conversation */
    AGENT_BOT = "AGENT_BOT",
  }
  export enum MessageType {
    /** Plain text message */
    TEXT = "TEXT",
    /** Internal note (not visible to customer) */
    NOTE = "NOTE",
    TASK = "TASK",
    /** Transfer notification for a call or chat session */
    TRANSFER = "TRANSFER",
    MEDIA = "MEDIA",
    IMAGE = "IMAGE",
    /** Document file (e.g. PDF, DOC, XLSX, JPEG, PNG, GIF, MP4, MP3, etc...) */
    FILE = "FILE",
    /** Rich link preview (similar to Microlink) */
    LINK = "LINK",
    /** Audio message (e.g. voice recording) */
    AUDIO = "AUDIO",
  }

  export interface ConversationMessage {
    text: string;
    sessionId: string;
    messageFrom: MessageFrom;
    messageType: MessageType;
    receivedTime?: string;
    event?: string;
    attachments: RecordAttachments;
  }

  export interface SendAttachment {
    id: string | number;
    url: string;
    type: string;
    fileName: string;
    size: number;
  }

  // Export the default instance
  const sdkInstance: SDK;
  export default sdkInstance;
}

// Declare global types
declare global {
  interface Window {
    omisdk: import("@mptransformation/omisdk").SDK;
    guestsdk: import("@mptransformation/omisdk").OmiGuestSDK;
  }
}
