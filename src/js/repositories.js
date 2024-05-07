export class LocalTaskRepository {
  constructor() {
    this.tasks = [
      {
        description: 'Complete the research report on market trends in the tech industry for the upcoming board meeting. Begin by compiling data from the latest industry reports and reputable sources, analyzing key statistics and projections. Break down the information into relevant sections, including market size, growth drivers, competitive analysis, and emerging technologies. Draft an executive summary highlighting the most significant findings and insights.',
        isDone: false,
        tags: ['tag1', 'tag2', 'tag3']
      },
      {
        description: 'Attend yoga class at 6:00 PM',
        isDone: false,
        tags: ['tag1', 'tag2', 'tag3']
      },
      {
        description: 'Water the plants in the backyard',
        isDone: false,
        tags: ['tag1', 'tag2', 'tag3']
      },
      {
        description: 'task to do',
        isDone: false,
        tags: ['tag1', 'tag2', 'tag3']
      },
    ]
  }

  async getAll() {
    return this.tasks
  }

  async add(taskToAdd) {
    this.tasks.push(taskToAdd)
  }

  async remove(taskToRemove) {
    this.tasks = this.tasks.filter(task => task !== taskToRemove)
  }
}