"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entities/project.entity");
const typeorm_2 = require("typeorm");
const project_collection_resource_1 = require("./resouces/project.collection.resource");
const project_item_resource_1 = require("./resouces/project.item.resource");
const report_service_1 = require("../report/report.service");
const status_enum_1 = require("../task/enum/status.enum");
let ProjectService = class ProjectService {
    constructor(projectRepository, reportService) {
        this.projectRepository = projectRepository;
        this.reportService = reportService;
    }
    async create(createProjectDto, user) {
        try {
            const code = await this.getNewCode(user);
            const project = await this.projectRepository.create(Object.assign(Object.assign({}, createProjectDto), { user,
                code }));
            await this.projectRepository.save(project);
            return {
                message: 'Project created successfully.',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [projects, total] = await this.projectRepository.findAndCount({
                where: { user: { id: user.id } },
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, project_collection_resource_1.projectCollectionResource)(projects),
                meta: {
                    total,
                    limit,
                    offset,
                    totalPages,
                    currenPage: offset,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAllProjectByMonth(user) {
        try {
            const projects = await this.projectRepository.find({
                where: { user: { id: user.id } },
                take: 5,
            });
            return projects.map((project) => {
                const total = project.tasks.length;
                const percentage = (project.tasks.filter((task) => task.status === status_enum_1.StatusEnum.DONE)
                    .length /
                    total) *
                    100;
                return {
                    name: project.name,
                    total,
                    percentage,
                };
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async findOne(id) {
        try {
            const project = await this.projectRepository.findOneBy({ id });
            return (0, project_item_resource_1.projectItemResource)(project);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateProjectDto) {
        try {
            await this.projectRepository.update(id, updateProjectDto);
            return {
                message: 'Project updated successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.projectRepository.softDelete(id);
            return {
                message: 'Project delete successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async generateReport(response, id) {
        try {
            const project = await this.projectRepository.findOneBy({ id });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            const pdfDoc = await this.reportService.projectProgressReport(project);
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'attachment; filename=project-progress-report.pdf');
            pdfDoc.info.Title = 'Project Progress Report';
            pdfDoc.pipe(response);
            pdfDoc.end();
        }
        catch (error) {
            console.error('Error generating PDF:', error.message);
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async getNewCode(user) {
        const allCodes = await this.getAllCodes(user);
        if (allCodes.length <= 0)
            return 1;
        const maxCode = Math.max(...allCodes);
        return maxCode + 1;
    }
    async getAllCodes(user) {
        try {
            const projects = await this.projectRepository.find({
                where: { user: { id: user.id } },
                select: ['code'],
            });
            return projects.map((project) => project.code);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        report_service_1.ReportService])
], ProjectService);
//# sourceMappingURL=project.service.js.map