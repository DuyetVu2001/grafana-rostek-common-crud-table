import React, { useState, useEffect } from 'react';
import { Button, ConfirmModal, Modal } from '@grafana/ui';
import { css, cx } from 'emotion';
import { update, deleteById, getFormUpdate } from 'api';
import { RenderForm } from './RenderForm';

type User = {
  id?: number | string;
  name?: string;
  age?: number | string;
};

type UpdateModalProps = {
  isOpen: boolean;
  baseUrl: string;
  onClose: () => void;

  data?: User | null;
};

export default function UpdateModal({ isOpen, baseUrl, data = null, onClose }: UpdateModalProps) {
  const [actualDelete, setActualDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<any>({});
  const [listInputs, setListInputs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFormData(data);

      const fetchInputs = async () => {
        const { data } = await getFormUpdate(baseUrl);
        setListInputs(data.data || []);
      };

      fetchInputs();
    }
  }, [isOpen, data, baseUrl]);

  useEffect(() => {
    if (actualDelete) {
      const deleteAsync = async () => {
        try {
          await deleteById(baseUrl, formData?.id);
          onClose();

          const refreshBtn = document.querySelector(".toolbar-button[aria-label='Refresh dashboard']");
          if (refreshBtn) {
            // @ts-ignore
            refreshBtn.click();
          }
        } catch (error: any) {
          alert(error.response?.data?.message || error.message);
        }
      };

      deleteAsync();
      setActualDelete(false);
    }
  }, [actualDelete, onClose, formData?.id, baseUrl]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      await update(baseUrl, formData);

      onClose();
      const refreshBtn = document.querySelector(".toolbar-button[aria-label='Refresh dashboard']");
      if (refreshBtn) {
        // @ts-ignore
        refreshBtn.click();
      }
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete"
        body="Are you sure you want to delete this?"
        confirmText="Delete"
        icon="exclamation-triangle"
        onConfirm={() => {
          setActualDelete(true);
          setShowDeleteModal(false);
        }}
        onDismiss={() => {
          setActualDelete(false);
          setShowDeleteModal(false);
        }}
      />

      <Modal title="Update" isOpen={isOpen} onClickBackdrop={onClose} onDismiss={onClose}>
        {/* notifi modals */}

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
            Update
          </Button>
          <Button type="button" onClick={() => setShowDeleteModal(true)} variant="destructive">
            Delete
          </Button>
        </form>
      </Modal>
    </>
  );
}
