function startReportDownloadStatus(download) {
  // initial file report
  console.log(
    `Time ${
      Date().split(' ')[4]
    }: Starting ${download.suggestedFilename()} file download. `
  );
  // continues waiting reports
  const intervalID = setInterval(() => {
    console.log(`Time ${Date().split(' ')[4]}: File is still downloading. `);
  }, 30000);

  return intervalID;
}

export default startReportDownloadStatus;
