import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import '../styles/components/sidebar.css'
import AppIcon from './AppIcon';

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <AppIcon />
            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}
