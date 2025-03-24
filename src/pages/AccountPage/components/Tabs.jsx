import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import SettingsTab from './SettingsTab';
import PreferitiTab from './PreferitiTab';
import RecensioniTab from './RecensioniTab';
export default function Tabs({ user }) {

    if (!user || !user.user_metadata) {
        return <p>Caricamento...</p>;
    }

    return (
        <TabView>
            {/* SETTINGS */}
            <TabPanel header="Account" leftIcon="bi bi-person-fill c-text-acc fs-5 c-bg-lightDark rounded-3 px-2 me-2" className="mb-3">
                <SettingsTab user={user} />
            </TabPanel>

            {/* PREFERITI */}
            <TabPanel header="Preferiti" leftIcon="bi bi-heart-fill c-text-acc fs-5 c-bg-lightDark rounded-3 px-2 me-2">
            <PreferitiTab/>
            </TabPanel>

            {/* RECENSIONI */}
            <TabPanel header="Recensioni" leftIcon="bi bi-list-stars c-text-acc fs-5 c-bg-lightDark rounded-3 px-2 me-2">
                <RecensioniTab/>
            </TabPanel>
        </TabView>
    );
}
