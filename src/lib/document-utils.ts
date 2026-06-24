import { getMime } from 'ranuts/utils';
import type { DocumentType } from './document-types';

/**
 * Get base path based on deployment environment
 * - GitHub Pages: uses /document/ path
 * - Docker/Other: uses root path /
 */
export const getBasePath = (): string => {
  if (typeof window === 'undefined') {
    return '/';
  }

  const pathname = window.location.pathname;
  // Check if we're in GitHub Pages (path starts with /document/ or contains /document/)
  if (pathname.startsWith('/document/') || pathname === '/document') {
    return '/document/';
  }
  // Docker or other deployments use root path
  return '/';
};

export const BASE_PATH = getBasePath();

/**
 * Get MIME type from file extension (using ranuts getMime utility)
 * @param extension - File extension
 * @returns string - MIME type
 */
export function getMimeTypeFromExtension(extension: string): string {
  // Use ranuts getMime for common image types, fallback to image/png
  const mime = getMime(extension?.toLowerCase() || '');
  return mime || 'image/png';
}

/**
 * Document type mapping
 */
export const DOCUMENT_TYPE_MAP: Record<string, DocumentType> = {
  docx: 'word',
  doc: 'word',
  odt: 'word',

  rtf: 'word',
  txt: 'word',

  // html: 'word',
  // mhtml: 'word',
  // mht: 'word',

  xlsx: 'cell',
  xls: 'cell',
  ods: 'cell',

  csv: 'cell',

  pptx: 'slide',
  ppt: 'slide',
  odp: 'slide',
};

/**
 * 获取文档类型
 */
export function getDocumentType(extension: string): DocumentType {
  const docType = DOCUMENT_TYPE_MAP[extension.toLowerCase()]
  if (!docType) {
    throw new Error(`Unsupported file format: ${extension}`)
  }
  return docType
}
