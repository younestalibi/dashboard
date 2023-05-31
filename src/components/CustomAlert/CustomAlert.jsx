import {Modal } from 'antd';

const CustomAlert = (props) => {
  const { open,setOpen, performAction, title } = props;
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Confirmation" 
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};
export default CustomAlert;