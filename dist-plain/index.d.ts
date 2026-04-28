import { Editor } from '@ckeditor/ckeditor5-core';

export type PlainEditorInstance = Editor & {
	getData: () => string;
	setData: (data: string) => void;
	destroy: () => Promise<unknown>;
};
export declare class CkeditorService {
	private editor;
	private pendingData;
	private tableBorderDefaultsDisposer;
	private contentChangeDisposer;
	private apiUrlUpload;
	constructor({ apiUrlUpload }: {
		apiUrlUpload: string;
	});
	renderEditor({ containerId, defaultValue, }: {
		containerId: string;
		defaultValue?: string;
	}): Promise<PlainEditorInstance>;
	/**
	 * Fires after the editor HTML changes (debounced). Use to sync reactive forms with getData().
	 */
	subscribeContentChange(callback: () => void): void;
	getData(): string;
	getRawData(): string;
	setData(data: string): void;
	destroy(): Promise<void>;
}
/**
 * Lưu thông tin data editor vào localStorage
 * Dữ liệu là object lồng thêm 1 object với key là các field text
 */
export interface EditorFieldData {
	text: string;
	timestamp: number;
}
export interface EditorStorageData {
	[storageKey: string]: EditorFieldData;
}
export declare const STORAGE_KEY = "editor_data";
/**
 * Lưu data editor vào localStorage
 * @param storageKey - Key để lưu trong localStorage
 * @param text - Nội dung text của editor
 */
export declare function saveEditorData(storageKey: string, text: string): void;
/**
 * Lấy data editor từ localStorage theo key
 * @param storageKey - Key để lấy từ localStorage
 * @returns EditorFieldData hoặc null nếu không có data
 */
export declare function getEditorData(storageKey: string): EditorFieldData | null;
/**
 * Lấy tất cả data editor từ localStorage
 * @returns Object chứa tất cả editor data
 */
export declare function getAllEditorData(): EditorStorageData;
/**
 * Xóa data editor khỏi localStorage
 * @param storageKey - Key cần xóa
 */
export declare function clearEditorData(storageKey: string): void;
/**
 * Xóa tất cả editor data khỏi localStorage
 */
export declare function clearAllEditorData(): void;
/**
 * Xóa các thẻ có display: none trong style attribute
 * @param html - HTML string cần xử lý
 * @returns HTML đã được cleanup
 */
export declare function removeDisplayNoneElements(html: string): string;

export {};
