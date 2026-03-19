let ffmpegInstance: any = null;

export async function getFFmpeg() {
  if (ffmpegInstance) return ffmpegInstance;

  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();
  ffmpegInstance = ffmpeg;
  return ffmpeg;
}

export async function getFetchFile() {
  const { fetchFile } = await import("@ffmpeg/util");
  return fetchFile;
}
