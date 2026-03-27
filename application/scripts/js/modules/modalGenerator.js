let instances = 1;

const createModal = ({ id, title, body, footer }) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="modal fade" id="${id}_${instances++}">
            <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                      <h1 class="modal-title fs-5">${title}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                   </div>
                   <div class="modal-body">${body}</div>
                   <div class="modal-footer d-flex justify-content-between">${footer}</div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(wrapper);
    return new bootstrap.Modal(wrapper.firstElementChild);
};

export default createModal;