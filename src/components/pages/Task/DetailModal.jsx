import Button from '../../Common/Button';
const DetailModal = ({ isOpen, onClose, task }) => {


  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <div className="">
          <div className="detailBody">
          <small className="notes">{task.notes}</small>
              <p>
                <a href={task.webViewLink} target="_blank" rel="noopener noreferrer">
                  See in Google Task
                </a>
              </p>
              <p>Updated: &nbsp; {new Date(task.updated).toLocaleString()} </p>
              <p>Status: <span>{task.status === "needsAction" ? "No Started" : task.status}</span> </p>

          </div>
        </div>
        <div className="modal-footer">
          <Button className="close" type="close" label="Close" onAction={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
