import React, { useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AccountMenu.scss';
import { scrollTop } from '../../../Helpers';
import { UserContext } from '../../../context/UserContext';
import { RiAccountCircleLine } from 'react-icons/ri';
import RegisterModal from '../../accountModals/registerModal/RegisterModal';

function AccountMenu(props) {

    const panel = useRef();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(user.username);
        function handleClickOutside(event) {
            if (panel.current && !panel.current.contains(event.target)) {
                if (panel.current.style.width !== '' && panel.current.style.width !=='0px') {
                    closeMenu(event);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    const openMenu = () => {
        panel.current.style.width = '250px';
    }

    const closeMenu = (event) => {
        panel.current.style.width = '0px';
        event.target.id !== 'closebtn' && scrollTop();
    }

    return (
        <div className='account-menu'>
            <div className='account-icon' style={{color: '#21a1af'}}>
                <RiAccountCircleLine size='50px' onClick={openMenu}/>
            </div>
            <div id='account-panel' className='menu' ref={panel}>
                <a href='#' id="closebtn" onClick={closeMenu}>&times;</a>
                { user.username !== 'anonymous' ? <> 
                    <div className='profile-icon' style={{color: '#21a1af'}}>
                        <RiAccountCircleLine size={'lg'} onClick={openMenu}/>
                    </div>
                    <Link to={`/profile/` + user.username} id='profile-name' className='title' onClick={closeMenu}>{user.username}</Link>
                    <Link to='/blog-posts/user' onClick={closeMenu}>Your Blog Posts</Link>
                    <Link to='/blog-posts/new' onClick={closeMenu}>New Blog Post</Link>
                </> : <>
                    <a href='#' onClick={props.showRegister}>Choose a Username</a>
                    <RegisterModal
                        registerModal={props.registerModal}
                        showRegister={props.showRegister}
                        closeRegister={props.closeRegister}
                        setLogin={props.setLogin}
                    /> 
                </>}
                <a href='#' onClick={props.logout}>Logout</a>
            </div>
        </div>
    );
}

export default AccountMenu;