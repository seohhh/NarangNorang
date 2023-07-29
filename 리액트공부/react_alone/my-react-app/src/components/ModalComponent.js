import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleToggleModal}>
        모달 열기
      </Button>

      <Modal show={showModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>모달 제목</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          모달 내용을 이곳에 작성합니다.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleModal}>
            닫기
          </Button>
          {/* 추가 버튼 또는 기타 액션 버튼을 이곳에 작성할 수 있습니다. */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
