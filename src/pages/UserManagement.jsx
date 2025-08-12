import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import usersData from '../data/users';
import '../styles/pages/UserManagement.css';


const emptyUser = { name: '', email: '', mobile: '', status: 'Active', photo: '' };

const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [modal, setModal] = useState({ open: false, type: '', user: null });
  const [toast, setToast] = useState({ open: false, message: '' });
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState(emptyUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Modal handlers
  const openModal = (type, user = null) => {
    setModal({ open: true, type, user });
    if (type === 'edit' && user) setForm(user);
    if (type === 'add') setForm(emptyUser);
  };
  const closeModal = () => { setModal({ open: false, type: '', user: null }); setForm(emptyUser); };
  const showToast = message => { setToast({ open: true, message }); };
  const closeToast = () => setToast({ open: false, message: '' });

  // CRUD actions
  const handleAdd = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setUsers([...users, { ...form, id: Date.now() }]);
    setLoading(false);
    closeModal();
    showToast('User added (demo)');
  };
  const handleEdit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setUsers(users.map(u => u.id === form.id ? form : u));
    setLoading(false);
    closeModal();
    showToast('User updated (demo)');
  };
  const handleDelete = async id => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setUsers(users.filter(u => u.id !== id));
    setLoading(false);
    closeModal();
    showToast('User deleted (demo)');
  };
  const handleLogin = () => { navigate('/signin'); };
  const handleImport = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setLoading(false);
    showToast('Demo: Import not available');
  };
  const handleExport = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setLoading(false);
    showToast('Demo: Export not available');
  };
  const handleFilter = val => setFilter(val);

  // Filtered users
  const filteredUsers = filter ? users.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase())) : users;

  // Form change handler
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  return (
    <main className="user-mgmt-page">
      {loading && (
        <div className="user-mgmt-loading-overlay">
          <LoadingSpinner label="Processing..." />
        </div>
      )}
      <section className="user-mgmt-content">
        <button className="back-home-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <header className="user-mgmt-topbar">
          <h2>Members</h2>
          <div className="user-mgmt-actions">
            <button className="btn primary" onClick={() => openModal('add')} disabled={loading}>Add new</button>
            <button className="btn" onClick={handleImport} disabled={loading}>Import members</button>
            <button className="btn" onClick={handleExport} disabled={loading}>Export members (Excel)</button>
            <button className="btn filter" onClick={() => openModal('filter')} disabled={loading}>Filter</button>
          </div>
        </header>
        <section className="user-mgmt-table-wrap">
          <table className="user-mgmt-table" aria-label="User Management Table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Member name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th>Operation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td><img src={user.photo} alt={user.name} className="user-photo" /></td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-chip ${user.status === 'Active' ? 'active' : 'inactive'}`}>{user.status}</span>
                  </td>
                  <td>
                    <div className="op-icons">
                      <FaEye title="View" onClick={() => openModal('view', user)} />
                      <FaEdit title="Edit" onClick={() => openModal('edit', user)} />
                      <FaTrash title="Delete" onClick={() => openModal('delete', user)} />
                    </div>
                  </td>
                  <td><button className="btn login" onClick={handleLogin} disabled={loading}>Login</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
      {/* Add User Modal */}
      <Modal open={modal.open && modal.type === 'add'} onClose={closeModal}>
        <h3 className="modal-title">Add New User</h3>
        <form className="user-modal-form" onSubmit={handleAdd}>
          <label htmlFor="add-name">Name</label>
          <input id="add-name" name="name" value={form.name} onChange={handleFormChange} required />
          <label htmlFor="add-email">Email</label>
          <input id="add-email" name="email" type="email" value={form.email} onChange={handleFormChange} required />
          <label htmlFor="add-mobile">Mobile</label>
          <input id="add-mobile" name="mobile" value={form.mobile} onChange={handleFormChange} required />
          <label htmlFor="add-status">Status</label>
          <select id="add-status" name="status" value={form.status} onChange={handleFormChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <label htmlFor="add-photo">Photo URL</label>
          <input id="add-photo" name="photo" value={form.photo} onChange={handleFormChange} />
          <div className="modal-actions">
            <button className="btn" type="button" onClick={closeModal} disabled={loading}>Cancel</button>
            <button className="btn primary" type="submit" disabled={loading}>Add</button>
          </div>
        </form>
      </Modal>
      {/* Edit User Modal */}
      <Modal open={modal.open && modal.type === 'edit'} onClose={closeModal}>
        <h3 className="modal-title">Edit User</h3>
        <form className="user-modal-form" onSubmit={handleEdit}>
          <label htmlFor="edit-name">Name</label>
          <input id="edit-name" name="name" value={form.name} onChange={handleFormChange} required />
          <label htmlFor="edit-email">Email</label>
          <input id="edit-email" name="email" type="email" value={form.email} onChange={handleFormChange} required />
          <label htmlFor="edit-mobile">Mobile</label>
          <input id="edit-mobile" name="mobile" value={form.mobile} onChange={handleFormChange} required />
          <label htmlFor="edit-status">Status</label>
          <select id="edit-status" name="status" value={form.status} onChange={handleFormChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <label htmlFor="edit-photo">Photo URL</label>
          <input id="edit-photo" name="photo" value={form.photo} onChange={handleFormChange} />
          <div className="modal-actions">
            <button className="btn" type="button" onClick={closeModal} disabled={loading}>Cancel</button>
            <button className="btn primary" type="submit" disabled={loading}>Save</button>
          </div>
        </form>
      </Modal>
      {/* View User Modal */}
      <Modal open={modal.open && modal.type === 'view'} onClose={closeModal}>
        <h3 className="modal-title">User Details</h3>
        <div className="user-view-modal">
          <img src={modal.user?.photo} alt={modal.user?.name} className="user-photo large" />
          <div><b>Name:</b> {modal.user?.name}</div>
          <div><b>Email:</b> {modal.user?.email}</div>
          <div><b>Mobile:</b> {modal.user?.mobile}</div>
          <div><b>Status:</b> <span className={`status-chip ${modal.user?.status === 'Active' ? 'active' : 'inactive'}`}>{modal.user?.status}</span></div>
        </div>
      </Modal>
      {/* Delete User Modal */}
      <Modal open={modal.open && modal.type === 'delete'} onClose={closeModal}>
        <h3 className="modal-title">Delete User?</h3>
        <p>Are you sure you want to delete <b>{modal.user?.name}</b>?</p>
        <div className="modal-actions">
          <button className="btn" onClick={closeModal} disabled={loading}>Cancel</button>
          <button className="btn primary" onClick={() => handleDelete(modal.user.id)} disabled={loading}>Delete</button>
        </div>
      </Modal>
      {/* Filter Modal */}
      <Modal open={modal.open && modal.type === 'filter'} onClose={closeModal}>
        <h3 className="modal-title">Filter Users</h3>
        <input type="text" placeholder="Name or email" value={filter} onChange={e => handleFilter(e.target.value)} className="modal-filter-input" />
        <div className="modal-actions">
          <button className="btn primary" onClick={closeModal} disabled={loading}>Apply</button>
        </div>
      </Modal>
      <Toast open={toast.open} message={toast.message} onClose={closeToast} />
    </main>
  );
};

export default UserManagement; 