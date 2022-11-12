import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSaveAndBack = useRef(false);
  const isSaveAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSaveAndBack.current = false;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndBack = useCallback(() => {
    isSaveAndBack.current = true;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSaveAndNew.current = true;
    isSaveAndBack.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndBack = useCallback(() => {
    return isSaveAndBack.current;
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSaveAndNew.current;
  }, []);

  return {
    formRef,

    save: handleSave,
    saveAndBack: handleSaveAndBack,
    saveAndNew: handleSaveAndNew,

    isSaveAndBack: handleIsSaveAndBack,
    isSaveAndNew: handleIsSaveAndNew,
  };
};
