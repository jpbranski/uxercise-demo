// Tauri preparation layer
// These are placeholder functions for future Tauri integration

export function getAppVersion(): string {
  // In Tauri: return await invoke('get_app_version')
  return '1.0.0-web';
}

export function showNotification(title: string, body: string): void {
  // In Tauri: await invoke('show_notification', { title, body })
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
}

export function openWindow(url: string): void {
  // In Tauri: await shell.open(url)
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
}

export async function saveFile(filename: string, content: string): Promise<void> {
  // In Tauri: await save({ defaultPath: filename, filters: [...] })
  if (typeof window !== 'undefined') {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export function isTauriApp(): boolean {
  // In Tauri: return typeof window !== 'undefined' && '__TAURI__' in window
  return false;
}
