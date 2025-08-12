import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import profileData from '../data/profile';
import '../styles/pages/ProfileSettings.css';

const avatarUrl = 'https://randomuser.me/api/portraits/men/32.jpg';

const ProfileSettings = () => {
  const [form, setForm] = useState(profileData);
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState({ open: false, type: '' });
  const [toast, setToast] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false); // Add loading state
  const fileInputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => { setMounted(true); }, []);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setForm(f => ({ ...f, avatar: ev.target.result }));
      reader.readAsDataURL(file);
      setModal({ open: false, type: '' });
      setToast({ open: true, message: 'Avatar updated (demo)' });
    }
  };
  const handleSave = async e => {
    e.preventDefault();
    setLoading(true);
    // Simulate async save
    await new Promise(res => setTimeout(res, 1500));
    setLoading(false);
  setToast({ open: true, message: 'Profile updated (demo only)' });
  };
  const isValid = field => form[field] && form[field].length > 2;

  return (
    <div className="profile-settings-page">
      {loading && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(10,72,52,0.18)', zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <LoadingSpinner label="Saving..." />
        </div>
      )}
      <button className="back-home-btn" onClick={() => navigate('/')}>← Back to Home</button>
      <div className="profile-bg-anim">
        <div className="shape shape1" />
        <div className="shape shape2" />
        <div className="shape shape3" />
        <div className="shape shape4" />
      </div>
      <div className="profile-settings-center">
        <h1 className="profile-settings-title">Profile Settings</h1>
        <div className="profile-settings-card">
          <div className="profile-avatar-section">
            <img src={form.avatar} alt="User avatar" className="profile-avatar" />
            <button className="btn" onClick={() => setModal({ open: true, type: 'avatar' })}>CHANGE</button>
          </div>
          <form className="profile-settings-form" onSubmit={handleSave}>
            <div className="profile-form-row">
              <label htmlFor="profile-name">NAME</label>
              <input id="profile-name" name="name" value={form.name} onChange={handleChange} />
              {isValid('name') && <span className="valid-check">&#10003;</span>}
            </div>
            <div className="profile-form-row">
              <label htmlFor="profile-email">EMAIL</label>
              <input id="profile-email" name="email" type="email" value={form.email} onChange={handleChange} />
              {isValid('email') && <span className="valid-check">&#10003;</span>}
            </div>
            <div className="profile-form-row">
              <label htmlFor="profile-phone">PHONE</label>
              <input id="profile-phone" name="phone" value={form.phone} onChange={handleChange} />
              {isValid('phone') && <span className="valid-check">&#10003;</span>}
            </div>
            <div className="profile-form-row">
              <label htmlFor="profile-password">PASSWORD</label>
              <input id="profile-password" name="password" type="password" value={form.password} onChange={handleChange} />
              {isValid('password') && <span className="valid-check">&#10003;</span>}
            </div>
            <button type="submit" className="btn primary" disabled={loading}>SAVE</button>
          </form>
        </div>
      </div>
      {/* Avatar Modal */}
      <Modal open={modal.open && modal.type === 'avatar'} onClose={() => setModal({ open: false, type: '' })}>
        <h3 className="modal-title">Change Avatar</h3>
        <div className="profile-avatar-modal">
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="profile-avatar-input" />
          {form.avatar && <img src={form.avatar} alt="Preview" className="profile-avatar-preview" />}
        </div>
      </Modal>
      <Toast open={toast.open} message={toast.message} onClose={() => setToast({ open: false, message: '' })} />
    </div>
  );
};

export default ProfileSettings; 