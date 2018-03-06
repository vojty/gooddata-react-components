import * as React from 'react';
import { mount } from 'enzyme';

import { delay } from '../../tests/utils';
import {
    HeadlineTransformation,
    oneMeasureDataSource
} from '../../tests/mocks';

jest.mock('@gooddata/indigo-visualizations', () => ({
    HeadlineTransformation
}));

import { Headline } from '../Headline';
import { ICommonVisualizationProps } from '../base/VisualizationLoadingHOC';

describe('Headline', () => {
    const createComponent = () => {
        return mount<Partial<ICommonVisualizationProps>>((
            <Headline
                dataSource={oneMeasureDataSource}
                afterRender={jest.fn()}
                drillableItems={[]}
                resultSpec={{}}
            />
        ));
    };

    it('should render HeadlineTransformation and pass down given props and props from execution', () => {
        const wrapper = createComponent();

        return delay().then(() => {
            const renderdHeadlineTrans = wrapper.find(HeadlineTransformation);
            const wrapperProps = wrapper.props();
            expect(renderdHeadlineTrans.props()).toMatchObject({
                executionRequest: {
                    afm: wrapperProps.dataSource.getAfm(),
                    resultSpec: wrapperProps.resultSpec
                },
                executionResponse: expect.any(Object),
                executionResult: expect.any(Object),
                onAfterRender: wrapperProps.afterRender,
                drillableItems: wrapperProps.drillableItems
            });
        });
    });
});
