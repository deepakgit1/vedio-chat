// @flow

import type { Dispatch } from 'redux';

import {
    HIDE_DIALOG,
    HIDE_SHEET,
    OPEN_DIALOG,
    OPEN_SHEET
} from './actionTypes';
import { isDialogOpen } from './functions';

/**
 * Signals Dialog to close its dialog.
 *
 * @param {Object} [component] - The {@code Dialog} component to close/hide. If
 * {@code undefined}, closes/hides {@code Dialog} regardless of which
 * component it's rendering; otherwise, closes/hides {@code Dialog} only if
 * it's rendering the specified {@code component}.
 * @returns {{
 *     type: HIDE_DIALOG,
 *     component: (React.Component | undefined)
 * }}
 */
export function hideDialog(component: ?Object) {
    return {
        type: HIDE_DIALOG,
        component
    };
}

/**
 * Closes the active sheet.
 *
 * @returns {{
 *     type: HIDE_SHEET,
 * }}
 */
export function hideSheet() {
    return {
        type: HIDE_SHEET
    };
}

/**
 * Signals Dialog to open dialog.
 *
 * @param {Object} component - The component to display as dialog.
 * @param {Object} [componentProps] - The React {@code Component} props of the
 * specified {@code component}.
 * @returns {{
 *     type: OPEN_DIALOG,
 *     component: React.Component,
 *     componentProps: (Object | undefined)
 * }}
 */
export function openDialog(component: Object, componentProps: ?Object) {
    return {
        type: OPEN_DIALOG,
        component,
        componentProps
    };
}

/**
 * Opens the requested sheet.
 *
 * @param {Object} component - The component to display as a sheet.
 * @param {Object} [componentProps] - The React {@code Component} props of the
 * specified {@code component}.
 * @returns {{
 *     type: OPEN_SHEET,
 *     component: React.Component,
 *     componentProps: (Object | undefined)
 * }}
 */
export function openSheet(component: Object, componentProps: ?Object) {
    return {
        type: OPEN_SHEET,
        component,
        componentProps
    };
}

/**
 * Signals Dialog to open a dialog with the specified component if the component
 * is not already open. If it is open, then Dialog is signaled to close its
 * dialog.
 *
 * @param {Object} component - The component to display as dialog.
 * @param {Object} [componentProps] - The React {@code Component} props of the
 * specified {@code component}.
 * @returns {Function}
 */
export function toggleDialog(component: Object, componentProps: ?Object) {
    return (dispatch: Dispatch<any>, getState: Function) => {
        if (isDialogOpen(getState, component)) {
            dispatch(hideDialog(component));
        } else {
            dispatch(openDialog(component, componentProps));
        }
    };
}
