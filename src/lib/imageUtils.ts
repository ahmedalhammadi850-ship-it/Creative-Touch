export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string | undefined;
      resolve(result ? result.split(',')[1] : '');
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

export async function compressImageToBase64(file: File, maxPx = 900, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    let url = '';
    try {
      url = URL.createObjectURL(file);
    } catch {
      fileToBase64(file).then(resolve);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          try { URL.revokeObjectURL(url); } catch { /* ignore */ }
          fileToBase64(file).then(resolve);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try { URL.revokeObjectURL(url); } catch { /* ignore */ }
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl.split(',')[1]);
      } catch {
        try { URL.revokeObjectURL(url); } catch { /* ignore */ }
        fileToBase64(file).then(resolve);
      }
    };
    img.onerror = () => {
      try { URL.revokeObjectURL(url); } catch { /* ignore */ }
      fileToBase64(file).then(resolve);
    };
    img.src = url;
  });
}

export async function safeGetImageBase64(file: File): Promise<string> {
  try {
    return await compressImageToBase64(file);
  } catch {
    try {
      return await fileToBase64(file);
    } catch {
      return '';
    }
  }
}
