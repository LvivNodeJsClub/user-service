const NotFoundError = require('error/notFoundError');

class GroupService {

    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }

    async getAll() {
        return this.groupRepository.getAll();
    }

    async get(id) {
        const group = await this.groupRepository.get(id);
        if (typeof group === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }

        return group
    }

    async create(group) {
        delete group.id;
        return this.groupRepository.create(group);
    }

    async update(id, group) {
        const existingGroup = await this.groupRepository.get(id);
        if (typeof existingGroup === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }

        delete group.id;
        return this.groupRepository.update(id, group);
    }

    async delete(id) {
        const existingGroup = await this.groupRepository.get(id);
        if (typeof existingGroup === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }

        return this.groupRepository.delete(id);
    }
}

module.exports = GroupService;
