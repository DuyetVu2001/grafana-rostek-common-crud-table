import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@grafana/ui';
import { css, cx } from 'emotion';
import { create, getFormCreate } from 'api';
import { RenderForm } from './RenderForm';

type CreateModalProps = {
  isOpen: boolean;
  postUrl: string;

  onClose: () => void;
};

export default function CreateModal({ isOpen, postUrl, onClose }: CreateModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [listInputs, setListInputs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFormData({});

      const fechInputs = async () => {
        const { data } = await getFormCreate(postUrl);
        setListInputs(data.data || []);
      };

      fechInputs();
    }
  }, [isOpen, postUrl]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await create(formData);

    onClose();
    const refreshBtn = document.querySelector(".toolbar-button[aria-label='Refresh dashboard']");
    if (refreshBtn) {
      // @ts-ignore
      refreshBtn.click();
    }
  };

  return (
    <Modal title={'Create'} isOpen={isOpen} onClickBackdrop={onClose} onDismiss={onClose}>
      <form onSubmit={handleSubmit}>
        <RenderForm listInputs={listInputs} formData={formData} setFormData={setFormData} />

        <Button
          className={cx(
            css`
              margin-right: 16px;
            `
          )}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
}
