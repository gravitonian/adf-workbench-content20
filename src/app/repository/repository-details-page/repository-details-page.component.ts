import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MinimalNodeEntryEntity, NodeBody } from 'alfresco-js-api';
import {
  CardViewDateItemModel, CardViewTextItemModel,
  CardViewItem, ContentService, NodesApiService,
  NotificationService, CardViewUpdateService, UpdateNotification
} from '@alfresco/adf-core';

import { RepositoryContentModel } from '../repository-content.model';

@Component({
  selector: 'app-repository-details-page',
  templateUrl: './repository-details-page.component.html',
  styleUrls: ['./repository-details-page.component.scss']
})
export class RepositoryDetailsPageComponent implements OnInit {
  node: MinimalNodeEntryEntity;
  parentFolder: MinimalNodeEntryEntity;
  properties: Array<CardViewItem>;

  /* Properties to do with editing */
  propertiesChanged = false;
  titleProp: CardViewTextItemModel;
  descProp: CardViewTextItemModel;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private nodeService: NodesApiService,
              private contentService: ContentService,
              private cardViewUpdateService: CardViewUpdateService,
              protected notificationService: NotificationService) {
    this.properties = new Array<CardViewItem>();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const nodeId = params['node-id'];
      console.log('Node ID: ', nodeId);

      this.nodeService.getNode(nodeId).subscribe((entry: MinimalNodeEntryEntity) => {
        this.node = entry;

        this.nodeService.getNode(this.node.parentId).subscribe((parentNode: MinimalNodeEntryEntity) => {
          this.parentFolder = parentNode;
        });

        this.setupProps(this.node);
      });
    });

    this.cardViewUpdateService.itemUpdated$.subscribe(this.updateNodeDetails.bind(this));
  }

  private setupProps(node: MinimalNodeEntryEntity) {
    console.log('setupProps: ', node.id);

    // Properties that are always available
    const idProp = new CardViewTextItemModel({label: 'Id:', value: node.id, key: 'nodeId'});
    const typeProp = new CardViewTextItemModel({label: 'Type:', value: node.nodeType, key: 'nodeType'});
    const secTypeProp = new CardViewTextItemModel({
      label: 'Secondary Types:',
      value: node.aspectNames,
      key: 'nodeSecTypes'
    });
    const creatorProp = new CardViewTextItemModel({
      label: 'Creator:',
      value: node.createdByUser.displayName,
      key: 'createdBy'
    });
    const createdProp = new CardViewDateItemModel({
      label: 'Created:',
      value: node.createdAt,
      format: 'MMM DD YYYY',
      key: 'createdDate'
    });
    const modifierProp = new CardViewTextItemModel({
      label: 'Modifier:',
      value: node.modifiedByUser.displayName,
      key: 'createdBy'
    });
    const modifiedProp = new CardViewDateItemModel({
      label: 'Modified:',
      value: node.modifiedAt,
      format: 'MMM DD YYYY',
      key: 'modifiedDate'
    });

    this.properties.push(idProp);
    this.properties.push(typeProp);
    this.properties.push(secTypeProp);

    if (node.isFile) {
      // Add some content file specific props
      const sizeProp = new CardViewTextItemModel({
        label: 'Size (bytes):',
        value: node.content.sizeInBytes,
        key: 'size'
      });
      const mimetypeProp = new CardViewTextItemModel({
        label: 'Mimetype:',
        value: node.content.mimeTypeName,
        key: 'mimetype'
      });
      this.properties.push(sizeProp);
      this.properties.push(mimetypeProp);
    }

    // Aspect properties
    if (node.aspectNames.indexOf(RepositoryContentModel.TITLED_ASPECT_QNAME) > -1) {
      this.titleProp = new CardViewTextItemModel({label: 'Title:',
        value: node.properties[RepositoryContentModel.TITLE_PROP_QNAME],
        key: 'title', editable: true, default: ''});
      this.descProp = new CardViewTextItemModel({label: 'Description:',
        value: node.properties[RepositoryContentModel.DESC_PROP_QNAME],
        key: 'description', editable: true, default: '', multiline: true});
      this.properties.push(this.titleProp);
      this.properties.push(this.descProp);
    }

    // Author can be available if extracted during ingestion of content
    if (node.properties && node.properties[RepositoryContentModel.AUTHOR_PROP_QNAME]) {
      const authorProp = new CardViewTextItemModel({
        label: 'Author:',
        value: node.properties[RepositoryContentModel.AUTHOR_PROP_QNAME], key: 'author'
      });
      this.properties.push(authorProp);
    }

    this.properties.push(creatorProp);
    this.properties.push(createdProp);
    this.properties.push(modifierProp);
    this.properties.push(modifiedProp);
  }

  onGoBack($event: Event) {
    this.navigateBack2DocList();
  }

  onDownload($event: Event) {
    const url = this.contentService.getContentUrl(this.node.id, true);
    const fileName = this.node.name;
    this.download(url, fileName);
  }

  onDelete($event: Event) {
    this.nodeService.deleteNode(this.node.id).subscribe(() => {
      this.navigateBack2DocList();
    });
  }

  private navigateBack2DocList() {
    this.router.navigate(['../'],
      {
        queryParams: {current_folder_id: this.parentFolder.id},
        relativeTo: this.activatedRoute
      });
  }

  private download(url: string, fileName: string) {
    if (url && fileName) {
      const link = document.createElement('a');

      link.style.display = 'none';
      link.download = fileName;
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private updateNodeDetails(updateNotification: UpdateNotification) {
    const currentValue = updateNotification.target.value;
    const newValue = updateNotification.changed[updateNotification.target.key];
    if (currentValue !== newValue) {
      console.log(updateNotification.target, ' = ', updateNotification.changed);
      if (updateNotification.target.key === this.titleProp.key) {
        this.titleProp.value = updateNotification.changed[this.titleProp.key];
      }
      if (updateNotification.target.key === this.descProp.key) {
        this.descProp.value = updateNotification.changed[this.descProp.key];
      }
      this.propertiesChanged = true;
    }
  }

  /**
   * Updates the node with identifier 'nodeId'.
   * For example, you can rename a file or folder:
   * {
   *  "name": "My new name"
   * }
   *
   * You can also set or update one or more properties:
   * {
   *  "properties":
   *     {
   *      "cm:title": "Folder title"
   *     }
   * }
   *
   * If you want to add or remove aspects, then you must use **GET /nodes/{nodeId}** first to get the complete
   * set of *aspectNames*.
   * Currently there is no optimistic locking for updates, so they are applied in "last one wins" order.
   */
  onSave($event: Event) {
    console.log('this.titleProp.value = ', this.titleProp.value);
    console.log('this.descProp.value = ', this.descProp.value);

    // Set up the properties that should be updated
    const nodeBody = <NodeBody> {};
    nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY] = {};
    nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.TITLE_PROP_QNAME] = this.titleProp.value;
    nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.DESC_PROP_QNAME] = this.descProp.value;

    // Make the call to Alfresco Repo and update props
    this.nodeService.updateNode(this.node.id, nodeBody).subscribe(
      () => {
        this.notificationService.openSnackMessage(
          `Updated properties for '${this.node.name}' successfully`,
          4000);
      }
    );

    this.propertiesChanged = false;
  }

  isSaveDisabled() {
    return !this.propertiesChanged;
  }
}
