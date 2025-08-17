import { Branch } from '@api/branch/entities/branch.entity';
import { Client } from '@api/client/entities/client.entity';
import { Project } from '@api/project/entities/project.entity';
import { Task } from '@api/task/entities/task.entity';
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
  h1: {
    fontSize: 16,
    bold: true,
    margin: [0, 4],
  },
  h2: {
    fontSize: 14,
    margin: [0, 4],
  },
  p: {
    fontSize: 12,
    margin: [0, 4],
  },
};

function getDateDifferenceInDays(startDate: Date, endDate: Date): number {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

function getDaysSinceProjectStart(startDate: Date): number {
  const today = new Date();
  const timeDifference = today.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

function getDaysAdditionalProjectStart(endDate: Date): number {
  const today = new Date();
  const timeDifference = today.getTime() - endDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference > 0 ? daysDifference : 0;
}

function getStatusTask(status: string) {
  switch (status) {
    case 'PENDING':
      return 'Pendiente';
    case 'IN_PROGRESS':
      return 'En Proceso';
    case 'DONE':
      return 'Finalizada';
  }
}

export const progressReport = (project: Project): TDocumentDefinitions => {
  const tasks = project.tasks;
  const client: Client | Branch | null = project.client
    ? project.client
    : project.branch
      ? project.branch
      : null;
  return {
    defaultStyle: {
      ...styles,
      fontSize: 12,
    },
    footer: [
      {
        text: '¡Gracias por confiar en ProArq SaaS para su proyecto!',
        margin: [30, 0],
        alignment: 'center',
        bold: true,
      },
    ],
    content: [
      {
        text: `Reporte de Avance de Obra`,
        fontSize: 20,
        bold: true,
      },
      {
        text: [
          {
            text: project.name,
            style: 'p',
          },
        ],
      },
      {
        text: [
          {
            text: new Date(project.startDate).toLocaleDateString(),
            style: 'p',
          },
        ],
      },
      {
        text: [
          {
            text: 'No. 000' + project.code,
            style: 'p',
          },
        ],
      },
      {
        columns: [
          {
            text: [
              {
                text: 'Detalles del Cliente: \n',
                fontSize: 14,
                bold: true,
              },
              {
                text: client?.name + '\n',
              },
              {
                text: client?.email + '\n',
              },
              {
                text: client?.dni + '\n',
              },
              {
                text: client?.phone + '\n',
              },
              {
                text: client?.address
                  ? `${client.address.country} ${client.address.state} ${client.address.city} ${client.address.postalCode}`
                  : '',
              },
            ],
          },
          {
            text: [
              {
                text: 'Detalles del Prestador de Servicios: \n',
                fontSize: 14,
                bold: true,
              },
              {
                text: project.user.name + '\n',
              },
              {
                text: project.user.email + '\n',
              },
              {
                text: project.user.dni + '\n',
              },
              {
                text: project.user.phone + '\n',
              },
            ],
            alignment: 'left',
          },
        ],
        margin: [0, 10],
      },
      {
        text: project.description,
        margin: [0, 20],
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            ['Titulo', 'Descripción'],
            [
              { text: 'Fecha de Inicio:' },
              { text: new Date(project.startDate).toLocaleDateString() },
            ],
            [
              { text: 'Plazo Acordado:' },
              {
                text:
                  getDateDifferenceInDays(
                    new Date(project.startDate),
                    new Date(project.endDate),
                  ) + ' Dias',
              },
            ],
            // [
            //   { text: 'Total, Días Paralizados:' },
            //   {
            //     text: '0 días',
            //   },
            // ],
            [
              { text: 'Total, Días Transcurridos:' },
              {
                text:
                  getDaysSinceProjectStart(new Date(project.startDate)) > 0
                    ? new Date(project.startDate)
                    : 0 + ' días',
              },
            ],
            [
              { text: 'Total, Días Adicionales:' },
              {
                text:
                  getDaysAdditionalProjectStart(new Date(project.endDate)) +
                  ' días',
              },
            ],
            [
              { text: 'Fecha de Término de Obra:' },
              {
                text: new Date(project.endDate).toLocaleDateString(),
              },
            ],
          ],
        },
      },
      { text: 'Estado de las Tareas:', margin: [0, 20], bold: true },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            ['Titulo', 'Descripción', 'Estado'],
            ...tasks.map((task: Task) => [
              { text: task.name },
              { text: task.description || 'No Disponible' },
              { text: getStatusTask(task.status) },
            ]),
          ],
        },
      },
    ],
  };
};
