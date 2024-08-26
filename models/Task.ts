import Realm from 'realm';

class Task extends Realm.Object<Task> {
	_id!: string;
	name!: string;
	title!: string;
	description?: string;
	tag!: string;
	status!: string;
	createdAt!: Date;

	static schema = {
		name: 'Task',
		primaryKey: '_id',
		properties: {
			_id: 'string',
			title: 'string',
			description: 'string',
			tag: 'string',
			status: 'string',
		},
	};
}

export default Task;
