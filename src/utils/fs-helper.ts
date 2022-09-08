/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';

export function getNewFileHandle() {
  const myWindow: any = window;
  const suggestedName = moment().format('DD-MM-YYYY-(HH:mm)') + '-manual-report';

  // For Chrome 86 and later...
  if ('showSaveFilePicker' in myWindow) {
    const opts = {
      suggestedName,
      types: [
        {
          description: 'csv file',
          accept: { 'text/plain': ['.csv'] },
        },
      ],
    };
    return myWindow.showSaveFilePicker(opts);
  }
  // For Chrome 85 and earlier...
  const opts = {
    type: 'save-file',
    suggestedName,
    accepts: [
      {
        description: 'Text file',
        extensions: ['txt'],
        mimeTypes: ['text/plain'],
      },
    ],
  };
  return myWindow.chooseFileSystemEntries(opts);
}

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
export async function writeFile(fileHandle: any, contents: any) {
  // Support for Chrome 82 and earlier.
  if (fileHandle.createWriter) {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Write the full length of the contents
    await writer.write(0, contents);
    // Close the file and write the contents to disk
    await writer.close();
    return;
  }
  // For Chrome 83 and later.
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

export async function saveFileAs(content: any) {
  let fileHandle;
  try {
    fileHandle = await getNewFileHandle();
  } catch (ex) {
    console.error(ex);
  }

  try {
    await writeFile(fileHandle, content);
  } catch (ex) {
    console.error(ex);
  }
}
