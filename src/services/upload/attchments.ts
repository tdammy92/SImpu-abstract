const objectIsEmpty = (obj: object) => {
  if (!Boolean(obj)) {
    return true;
  }
  if (Object.keys(obj).length === 0) {
    return true;
  }
};

//handle formdata
export const toFormData = (
  values: object,
  files?: any,
  fileName: string = 'file',
) => {
  const formData = new FormData();

  if (!objectIsEmpty(values)) {
    const valuesArray = Object.entries(values);
    valuesArray.forEach(value => {
      if (Array.isArray(value[1])) {
        const arrayString = value[1].join(',');
        formData.append(value[0], arrayString);
      } else if (objectIsEmpty(value[1])) {
        const stringValue = JSON.stringify(value[1]);
        formData.append(value[0], stringValue);
      } else {
        formData.append(value[0], value[1]);
      }
    });
  }
  if (files) {
    formData.append(fileName ?? '', files);
  }
  return formData;
};

//uploadfile
export async function uploadFile(options: {
  url: string;
  file: any;
  fileName: string;
  data?: any;
  header: any;
  onProgress?: (percentage: number) => void;
}) {
  const {url, data, file, fileName, header, onProgress} = options;

  // console.log('param to xhr', JSON.stringify(options, null, 2));

  return new Promise<any>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', header?.token);
    xhr.setRequestHeader('organisationID', header?.ordId);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      // console.log('Xhr response', resp?.data);
      res(resp?.data);
    };
    xhr.onerror = evt => rej(evt);
    xhr.onabort = evt => console.log(evt);
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        //@ts-ignore
        onProgress(Math.round(percentage));
      }
    };

    const formData = toFormData(data, file, fileName);

    xhr.send(formData);
  });
}
