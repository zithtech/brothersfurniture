import { deskCatalogue, deskTypes } from './desks';
import { chairCatalogue, chairTypes, ergonomicChairs } from './ergonomicChairs';
import { loungeCatalogue, loungeTypes } from './lounge';
import { meetingTableCatalogue, meetingTableTypes } from './meetingTables';
import { storageCatalogue, storageTypes } from './storage';
import { workstationCatalogue, workstationTypes } from './workstations';
/** Every shop category's full catalogue. Add a category here and it appears in Shop, counts and "All". */
export const catalogues = {
    Workstations: {
        items: workstationCatalogue,
        types: workstationTypes,
        noun: ['workstation', 'workstations'],
        intro: 'Linear, cluster, L-shape, bench and training workstations — modular, made to your floor plan.',
    },
    'Office Chairs': {
        items: chairCatalogue,
        types: chairTypes,
        noun: ['chair', 'chairs'],
        intro: `${ergonomicChairs.length} ergonomic models — high back, medium back, mesh seat and visitor chairs, manufactured in Chennai.`,
    },
    Desks: {
        items: deskCatalogue,
        types: deskTypes,
        noun: ['desk', 'desks'],
        intro: 'Office, executive and compact desks in laminate and wood finishes.',
    },
    'Meeting Tables': {
        items: meetingTableCatalogue,
        types: meetingTableTypes,
        noun: ['table', 'tables'],
        intro: 'Conference tables for boardrooms, plus café and cafeteria tables for breakout and dining spaces.',
    },
    Storage: {
        items: storageCatalogue,
        types: storageTypes,
        noun: ['unit', 'units'],
        intro: 'Lockable cabinets, cupboards and mobile pedestals to keep every workspace clear.',
    },
    Lounge: {
        items: loungeCatalogue,
        types: loungeTypes,
        noun: ['seat', 'seats'],
        intro: 'Public beam seating for receptions and waiting areas, café chairs and study chairs.',
    },
};
export const allCatalogueItems = Object.values(catalogues).flatMap((c) => c.items);
