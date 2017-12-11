import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MinimalNodeEntryEntity, NodeBody } from 'alfresco-js-api';
import { ContentService, FormModel, FormService, FormValues,
  NodesApiService, NotificationService } from '@alfresco/adf-core';

import { RepositoryContentModel } from '../repository-content.model';
import { AlfrescoNodeForm } from '../repository-details-page/alfresco-node-form';
import { RepositoryFormFieldModel } from '../repository-formfield.model';

@Component({
  selector: 'app-repository-details-form-page',
  templateUrl: './repository-details-form-page.component.html',
  styleUrls: ['./repository-details-form-page.component.scss']
})
export class RepositoryDetailsFormPageComponent implements OnInit {
  node: MinimalNodeEntryEntity;
  parentFolder: MinimalNodeEntryEntity;

  form: FormModel;
  originalFormData: FormValues = {};

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private nodeService: NodesApiService,
              private contentService: ContentService,
              private formService: FormService,
              protected notificationService: NotificationService) {
  }

  ngOnInit() {
    const nodeId = this.activatedRoute.snapshot.params['node-id'];
    this.nodeService.getNode(nodeId).subscribe((entry: MinimalNodeEntryEntity) => {
      this.node = entry;

      this.nodeService.getNode(this.node.parentId).subscribe((parentNode: MinimalNodeEntryEntity) => {
        this.parentFolder = parentNode;
      });

      this.setupFormData(this.node);
    });
  }

  private setupFormData(node: MinimalNodeEntryEntity) {
    console.log('setupFormData: ', node.id);

    // Content file specific props
    let size = 'N/A';
    let mimetype = 'N/A';
    if (node.isFile) {
      size = '' + node.content.sizeInBytes;
      mimetype = node.content.mimeTypeName;
    }

    // Aspect properties
    let title = '';
    let desc = '';
    if (node.aspectNames.indexOf(RepositoryContentModel.TITLED_ASPECT_QNAME) > -1) {
      title = node.properties[RepositoryContentModel.TITLE_PROP_QNAME];
      desc = node.properties[RepositoryContentModel.DESC_PROP_QNAME];
    }

    // Author can be available if extracted during ingestion of content
    let author = '';
    if (node.properties && node.properties[RepositoryContentModel.AUTHOR_PROP_QNAME]) {
      author = node.properties[RepositoryContentModel.AUTHOR_PROP_QNAME];
    }

    this.originalFormData = {
      'id': node.id,
      'type': node.nodeType,
      'secondarytypes': node.aspectNames,
      'creator': node.createdByUser.displayName,
      'created': node.createdAt,
      'modifier': node.modifiedByUser.displayName,
      'modified': node.modifiedAt,
      'sizebytes': size,
      'mimetype': mimetype,
      'title': title,
      'description': desc,
      'author': author
    };

    // Read and parse the form that we will use to display the node
    const formDefinitionJSON: any = AlfrescoNodeForm.getDefinition();
    const readOnly = false;
    this.form = this.formService.parseForm(formDefinitionJSON, this.originalFormData, readOnly);
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

  onSave(form: FormModel) {
    const titleChanged = this.form.values[RepositoryFormFieldModel.TITLE_FIELD_NAME] &&
      (this.form.values[RepositoryFormFieldModel.TITLE_FIELD_NAME] !==
        this.originalFormData[RepositoryFormFieldModel.TITLE_FIELD_NAME]);
    const descriptionChanged = this.form.values[RepositoryFormFieldModel.DESC_FIELD_NAME] &&
      (this.form.values[RepositoryFormFieldModel.DESC_FIELD_NAME] !==
        this.originalFormData[RepositoryFormFieldModel.DESC_FIELD_NAME]);
    if (titleChanged || descriptionChanged) {
      // We got some non-readonly metadata that has been updated

      console.log('Updating [cm:title = ' + this.form.values[RepositoryFormFieldModel.TITLE_FIELD_NAME] + ']');
      console.log('Updating [cm:description = ' + this.form.values[RepositoryFormFieldModel.DESC_FIELD_NAME] + ']');

      // Set up the properties that should be updated
      const nodeBody = <NodeBody> {};
      nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY] = {};
      nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.TITLE_PROP_QNAME] = this.form.values['title'];
      nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.DESC_PROP_QNAME] = this.form.values['description'];

      // Make the call to Alfresco Repo and update props
      this.nodeService.updateNode(this.node.id, nodeBody).subscribe(
        () => {
          this.notificationService.openSnackMessage(
            `Updated properties for '${this.node.name}' successfully`,
            4000);
        }
      );
    } else {
      this.notificationService.openSnackMessage(
        `Node '${this.node.name}' was NOT saved, nothing has been changed!`,
        4000);
    }
  }

  private navigateBack2DocList() {
    this.router.navigate(['../../'],
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
}
