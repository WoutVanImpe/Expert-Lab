import { Component } from '@angular/core';
import { CdkDragDropOverviewExample } from './examples/1-create-draggable-elements/app.component';
import { CdkDragDropFreeDragPositionExample } from './examples/10-set-dom-position-of-a-draggable-element/app.component';
import { CdkDragDropBoundaryExample } from './examples/11-restrict-movement-within-an-element/app.component';
import { CdkDragDropAxisLockExample } from './examples/12-restrict-movement-along-an-axis/app.component';
import { CdkDragDropDelayExample } from './examples/13-delay-dragging/app.component';
import { CdkDragDropDisabledExample } from './examples/14-disable-dragging/app.component';
import { CdkDragDropHorizontalSortingExample } from './examples/15-list-orientation/app.component';
import { CdkDragDropMixedSortingExample } from './examples/16-list-wrapping/app.component';
import { CdkDragDropSortPredicateExample } from './examples/17-selective-sorting/app.component';
import { CdkDragDropDisabledSortingExample } from './examples/18-disable-sorting/app.component';
import { CdkDragDropCopyListExample } from './examples/19-copying-items-between-lists/app.component';
import { CdkDragDropSortingExample } from './examples/2-create-a-list-of-reorderable-draggable-elements/app.component';
import { CdkDragDropConnectedSortingExample } from './examples/3-transer-draggable-elements-between-lists/app.component';
import { CdkDragDropEnterPredicateExample } from './examples/4-selective-dragging/app.component';
import { CdkDragDropHandleExample } from './examples/6-customize-drag-handle/app.component';
import { CdkDragDropCustomPreviewExample } from './examples/7-customize-drag-preview/app.component';
import { CdkDragDropCustomPlaceholderExample } from './examples/8-customize-drag-placeholder/app.component';
import { CdkDragDropRootElementExample } from './examples/9-customize-drag-root-element/app.component';

@Component({
  selector: 'example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.module.scss'],
  imports: [
    CdkDragDropOverviewExample,
    CdkDragDropSortingExample,
    CdkDragDropConnectedSortingExample,
    CdkDragDropConnectedSortingExample,
    CdkDragDropEnterPredicateExample,
    CdkDragDropHandleExample,
    CdkDragDropCustomPreviewExample,
    CdkDragDropCustomPlaceholderExample,
    CdkDragDropRootElementExample,
    CdkDragDropFreeDragPositionExample,
    CdkDragDropBoundaryExample,
    CdkDragDropAxisLockExample,
    CdkDragDropDelayExample,
    CdkDragDropDisabledExample,
    CdkDragDropHorizontalSortingExample,
    CdkDragDropMixedSortingExample,
    CdkDragDropSortPredicateExample,
    CdkDragDropDisabledSortingExample,
    CdkDragDropCopyListExample,
  ],
})
export class ExampleContainer {}
