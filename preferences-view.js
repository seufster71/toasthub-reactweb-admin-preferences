import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from '../../coreView/common/list';
import Table from '../../coreView/common/table';
import Modal from '../../coreView/common/modal';
import moment from 'moment';

export default function PreferencesView({itemState, appPrefs, onListLimitChange,
	onSearchChange, onSearchClick, onPaginationClick, onOrderBy,
	onOption, closeModal, session}) {

	let tabLabels = ["Fields","Labels","Texts"];

	let columns = [];
	if (itemState.prefLabels != null && itemState.prefLabels.ADMIN_PREFERENCE_PAGE != null) {
		columns = itemState.prefLabels.ADMIN_PREFERENCE_PAGE;
	}
	let group = "TABLE1";
	
	let header = "";
	let parent = null;
	if (itemState.parent != null) {
		parent = itemState.parent.title;
	}
	if (itemState.prefTexts.ADMIN_PREFERENCE_PAGE != null && itemState.prefTexts.ADMIN_PREFERENCE_PAGE.ADMIN_PREFERENCE_PAGE_HEADER != null) {
		header = itemState.prefTexts.ADMIN_PREFERENCE_PAGE.ADMIN_PREFERENCE_PAGE_HEADER.value;
	}

	
	let listRows = [];
	let listItems = itemState.items;
	if (listItems != null && listItems.length > 0) {
		for (let i = 0; i < listItems.length; i++) {
			let showTab = false;
			let cells = [];
			let active = "Disabled";
			if (listItems[i].active == true) {
				active = "Active";
			}
			let created = "";
			if (listItems[i].created != null) {
				created = new Intl.DateTimeFormat('en-US', {
	         	year: 'numeric',
	         	month: 'short',
	         	day: 'numeric',
	         	hour: 'numeric',
	         	minute: 'numeric',
	         	second: 'numeric',
	         	timeZone: 'America/New_York'
				}).format(moment(listItems[i].created).toDate());
			}
			let modified = "";
			if (listItems[i].modified != null) {
				modified = new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
					timeZone: 'America/New_York'
				}).format(moment(listItems[i].modified).toDate());
			}
			cells.push(<div key={0} >
              	<div className="row">
              		<div className="col-md-12"> {listItems[i].title.langTexts[0].text}</div></div>
              		<div className="col-md-4">
              		<div>Category: {listItems[i].category}</div>
              		<div>Code: {listItems[i].name}</div>
              	</div>
                <div className="col-md-4">
                  	<div>Status: {active}</div>
                  	<div><small>Created: {created}</small></div>
                  	<div><small>Modified: {modified}</small></div>
                </div>
                <div className="col-md-4">
                  	<i className="fa fa-pencil-square-o fa-1" onClick={() => onOption("MODIFY")}/>
                  	<i className="fa fa-trash fa-1" onClick={() => onOption("DELETE")}/>
                	<i className="fa fa-id-card fa-1" aria-hidden="true"></i>
                	<i className="fa fa-tag fa-1" aria-hidden="true"></i>
                	<i className="fa fa-file-text fa-1" aria-hidden="true"></i>
                </div>
            </div>);

			listRows.push(<li key={listItems[i].id} scope="row" className="row">{cells}</li>);
		}
	} else {
		listRows.push(<li key="1"><div id={appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</div></li>);
	}
	
	// let header = <h5 style={{display:'inline'}}>{itemState.prefTexts.ADMIN_PREFERENCE_PAGE.ADMIN_PREFERENCE_PAGE_HEADER.value}</h5>;
	
	let deleteModalHeader = "Delete ";
	if (itemState.selected != null && itemState.selected.title != null) {
		deleteModalHeader += itemState.selected.title.defaultText;
	}
	let striped = true;
	
	let viewPortSmall = false;
	if (session.viewPort === 'small') { viewPortSmall = true }
	
	return (
		<div className="main_content">
			{viewPortSmall ? (
				<List
					itemState={itemState}
					header={header}
					columns={columns}
					appPrefs={appPrefs}
					onListLimitChange={onListLimitChange}
					onSearchChange={onSearchChange}
					onSearchClick={onSearchClick}
					onPaginationClick={onPaginationClick}
					onOrderBy={onOrderBy}
					onOption={onOption}
					striped={striped}/>
			) : (	
				<Table
		  			itemState={itemState}
		  			header={header}
		  			columns={columns}
					labelGroup={group}
		  			appPrefs={appPrefs}
		  			parent={parent}
		  			onListLimitChange={onListLimitChange}
		  			onSearchChange={onSearchChange}
		  			onSearchClick={onSearchClick}
		  			onPaginationClick={onPaginationClick}
		  			onOrderBy={onOrderBy}
		  			onOption={onOption}
				/>
			)}
			<Modal isOpen={itemState.isDeleteModalOpen} onClose={() => closeModal()} >
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
							<h4 className="modal-title">{deleteModalHeader}</h4>
						</div>
						<div className="modal-body">
							<h3>Are you sure you want to delete?</h3>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={() => onOption("DELETEFINAL",itemState.selected)}>Delete</button>
							<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}


PreferencesView.propTypes = {
	itemState: PropTypes.object.isRequired,
	appPrefs: PropTypes.object.isRequired,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onOrderBy: PropTypes.func,
	onOption: PropTypes.func,
	closeModal: PropTypes.func,
	onClickTabItem: PropTypes.func,
	onToggleItem: PropTypes.func,
	inputChange: PropTypes.func,
	openFormView: PropTypes.func,
	openLabelView: PropTypes.func,
	openTextView: PropTypes.func,
	openOptionView: PropTypes.func,
	session: PropTypes.object
};
