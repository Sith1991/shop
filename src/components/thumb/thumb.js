import React, { useEffect, useState } from 'react';

import './thumb.scss';

const Thumb = ({ file }) => {
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) {
      return;
    }
    setThumb(() => {
      let reader = new FileReader();

      reader.onloadend = () => {
        setThumb(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <img src={thumb} alt={file.name} className={'thumb'} />
  );
};

export { Thumb };
