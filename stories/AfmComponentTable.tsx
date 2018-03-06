import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { screenshotWrap } from '@gooddata/test-storybook';

import { Table } from '../src/components/afm/Table';
import {
    AFM_TWO_MEASURES_ONE_ATTRIBUTE,
    AFM_TWO_MEASURES_ONE_ATTRIBUTE_CITIES,
    RESULT_SPEC_TWO_MEASURES_ONE_ATTRIBUTE_CITIES_TOTALS,
    RESULT_SPEC_TWO_MEASURES_ONE_ATTRIBUTE_TOTALS,
    AFM_ONE_RENAMED_MEASURE_ONE_RENAMED_ATTRIBUTE
} from './data/afmComponentProps';
import { onErrorHandler } from './mocks';
import '../styles/scss/charts.scss';

function logTotalsChange(data: any) {
    if (data.properties && data.properties.totals) {
        action('totals changed')(data.properties.totals);
    }
}

storiesOf('AFM components - Table', module)
    .add('two measures, one attribute', () => (
        screenshotWrap(
            <div style={{ width: 600, height: 300 }}>
                <Table
                    projectId="storybook"
                    afm={AFM_TWO_MEASURES_ONE_ATTRIBUTE}
                    onError={onErrorHandler}
                    maxHeight={223}
                />
            </div>
        )
    ))
    .add('renamed measure and renamed attribute', () => (
        screenshotWrap(
            <div style={{ width: 600, height: 300 }}>
                <Table
                    projectId="storybook"
                    afm={AFM_ONE_RENAMED_MEASURE_ONE_RENAMED_ATTRIBUTE}
                    onError={onErrorHandler}
                />
            </div>
        )
    ))
    .add('with table totals', () => (
        screenshotWrap(
            <div style={{ width: 600, height: 300 }}>
                <Table
                    projectId="storybook"
                    afm={AFM_TWO_MEASURES_ONE_ATTRIBUTE}
                    onError={onErrorHandler}
                    resultSpec={RESULT_SPEC_TWO_MEASURES_ONE_ATTRIBUTE_TOTALS}
                />
            </div>
        )
    ))
    .add('with table totals editable', () => (
        screenshotWrap(
            <div style={{ width: 600, height: 300 }}>
                <Table
                    projectId="storybook"
                    afm={AFM_TWO_MEASURES_ONE_ATTRIBUTE}
                    onError={onErrorHandler}
                    totalsEditAllowed={true}
                    resultSpec={RESULT_SPEC_TWO_MEASURES_ONE_ATTRIBUTE_TOTALS}
                    pushData={logTotalsChange}
                />
            </div>
        )
    ))
    .add('table with resizing', () => (
        screenshotWrap(
            <div
                style={{
                    width: 800,
                    height: 400,
                    padding: 10,
                    border: 'solid 1px #000000',
                    resize: 'both',
                    overflow: 'auto'
                }}
            >
                <Table
                    projectId="storybook"
                    afm={AFM_TWO_MEASURES_ONE_ATTRIBUTE_CITIES}
                    onError={onErrorHandler}
                    totalsEditAllowed={true}
                    resultSpec={RESULT_SPEC_TWO_MEASURES_ONE_ATTRIBUTE_CITIES_TOTALS}
                    pushData={logTotalsChange}
                />
            </div>
        )
    ));
