import * as React from 'react';

import { HeadlineTransformation } from '@gooddata/indigo-visualizations';

import { IntlWrapper } from './base/IntlWrapper';
import {
    IntlTranslationsProvider,
    ITranslationsComponentProps } from './base/TranslationsProvider';
import { fixEmptyHeaderItems } from './base/utils/fixEmptyHeaderItems';
import { HeadlinePropTypes, Requireable } from '../../proptypes/Headline';
import {
    ICommonVisualizationProps,
    visualizationLoadingHOC,
    ILoadingInjectedProps,
    commonDefaultprops
} from './base/VisualizationLoadingHOC';

export { Requireable };

export interface IHeadlineStatelessProps {
    HeadlineComponent?: React.ComponentClass<any>;
}

export class HeadlineStateless
    extends React.Component<IHeadlineStatelessProps & ICommonVisualizationProps & ILoadingInjectedProps> {
    public static defaultProps: Partial<ICommonVisualizationProps> = {
        ...commonDefaultprops,
        HeadlineComponent: HeadlineTransformation
    };

    public static propTypes = HeadlinePropTypes;

    public render(): JSX.Element {
        const {
            afterRender,
            drillableItems,
            locale,
            dataSource,
            resultSpec,
            executionResponse,
            executionResult
        } = this.props;

        return (
            <IntlWrapper locale={locale}>
                <IntlTranslationsProvider>
                    {(props: ITranslationsComponentProps) => (
                        <this.props.HeadlineComponent
                            onAfterRender={afterRender}
                            drillableItems={drillableItems}
                            executionRequest={{
                                afm: dataSource.getAfm(),
                                resultSpec
                            }}
                            executionResponse={executionResponse.executionResponse}
                            executionResult={
                                fixEmptyHeaderItems(executionResult, props.emptyHeaderString).executionResult
                            }
                        />
                    )}
                </IntlTranslationsProvider>
            </IntlWrapper>
        );
    }
}

export const Headline = visualizationLoadingHOC(HeadlineStateless);
