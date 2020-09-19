import { find } from 'lodash';
import * as React from 'react';
import { GenericErrorView } from 'ui/share/components/transition/ViewStrategiesSwitch/GenericErrorView';
import { ViewStrategy } from 'ui/share/components/transition/ViewStrategiesSwitch/models/ViewStrategy';

export function ViewStrategiesSwitch<T>({ viewStrategies, renderProps }: ViewStrategiesSwitchProps<T>): JSX.Element | null {
  try {
    const viewStrategy = find(viewStrategies, (strategy: ViewStrategy<T>) => strategy.isMatch(renderProps));

    if (!viewStrategy) {
      throw createError<T>(viewStrategies, renderProps);
    }

    return <viewStrategy.view {...renderProps} />;
  } catch (error) {
    return <GenericErrorView />;
  }
}

interface ViewStrategiesSwitchProps<T> {
  viewStrategies: ViewStrategy<T>[];
  renderProps: T;
}

function createError<T>(viewStrategies: ViewStrategy<T>[], renderProps: T): Error {
  return new Error(`
  Could not find a matching view strategy
    
  Relevant views: ${viewStrategies.map((viewStrategy: ViewStrategy<T>) => viewStrategy.view.name).join(', ')}
    
  RenderProps: ${JSON.stringify(renderProps)}
  `);
}
