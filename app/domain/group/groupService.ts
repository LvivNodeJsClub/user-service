import GroupRepository from "./groupRepository";

import NotFoundError from "../../error/notFoundError";

interface GroupDto {
    id: number;
}

export default class GroupService {

    constructor(private groupRepository: GroupRepository) {
    }

    async getAll() {
        return this.groupRepository.getAll();
    }

    async get(id: number) {
        const group = await this.groupRepository.get(id);
        if (typeof group === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }

        return group
    }

    async create(group: GroupDto) {
        // FIXME create new object
        delete group.id;
        return this.groupRepository.create(group);
    }

    async update(id: number, group: GroupDto) {
        const existingGroup = await this.groupRepository.get(id);
        if (typeof existingGroup === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }
        // FIXME create new object
        delete group.id;
        return this.groupRepository.update(id, group);
    }

    async delete(id: number) {
        const existingGroup = await this.groupRepository.get(id);
        if (typeof existingGroup === 'undefined') {
            throw new NotFoundError(`No group ${id}`);
        }

        return this.groupRepository.delete(id);
    }
}

module.exports = GroupService;
