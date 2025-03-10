import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, X, Save, Image, Github, AlertCircle, Eye, Code, Calendar, Star, Tag, Copy, ChevronDown, ChevronUp, Info } from 'lucide-react';

const ProjectsSection = ({ projects = [], isCurrentUser, onUpdateProjects }) => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    repoUrl: '',
    technologies: [],
    highlights: '',
    startDate: '',
    endDate: '',
    category: 'Web Application',
    status: 'Completed',
    role: '',
    team: '',
    featured: false
  });

  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured' && project.featured) return true;
    return project.category === filter || project.technologies.includes(filter);
  });

  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.endDate || Date.now()) - new Date(a.endDate || Date.now());
    if (sortBy === 'oldest') return new Date(a.endDate || Date.now()) - new Date(b.endDate || Date.now());
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  // Get all unique categories and technologies for filtering
  const allCategories = [...new Set(projects.map(p => p.category))].filter(Boolean);
  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies || []))].filter(Boolean);

  const handleAddProject = () => {
    setIsAddingProject(true);
    setNewProject({
      title: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      repoUrl: '',
      technologies: [],
      highlights: '',
      startDate: '',
      endDate: '',
      category: 'Web Application',
      status: 'Completed',
      role: '',
      team: '',
      featured: false
    });
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project.id);
    setNewProject({
      ...project,
      technologies: project.technologies || [],
      highlights: Array.isArray(project.highlights) ? project.highlights.join('\n') : project.highlights || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      category: project.category || 'Web Application',
      status: project.status || 'Completed',
      role: project.role || '',
      team: project.team || '',
      featured: project.featured || false
    });
  };

  const handleCancelEdit = () => {
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setNewProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : name === 'technologies' 
          ? value.split(',').map(tech => tech.trim()).filter(Boolean)
          : name === 'highlights' 
            ? value
            : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the highlights from string to array if needed
    const formattedHighlights = typeof newProject.highlights === 'string'
      ? newProject.highlights.split('\n').filter(item => item.trim())
      : newProject.highlights;
    
    const formattedProject = {
      ...newProject,
      highlights: formattedHighlights,
      updatedAt: new Date().toISOString()
    };
    
    if (editingProjectId) {
      // Update existing project
      const updatedProjects = projects.map(project => 
        project.id === editingProjectId ? { ...formattedProject, id: editingProjectId } : project
      );
      onUpdateProjects(updatedProjects);
    } else {
      // Add new project
      const projectWithId = {
        ...formattedProject,
        id: Date.now().toString(), // Simple ID generation
        createdAt: new Date().toISOString()
      };
      onUpdateProjects([...projects, projectWithId]);
    }
    
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      onUpdateProjects(updatedProjects);
    }
  };

  const handleExpandProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleToggleFeatured = (projectId) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, featured: !project.featured } : project
    );
    onUpdateProjects(updatedProjects);
  };

  const copyProjectLink = (url) => {
    navigator.clipboard.writeText(url);
    // Could implement a toast notification here
  };

  // Get appropriate status badge color
  const getStatusColor = (status) => {
    const statusColors = {
      'Completed': 'bg-green-800 text-green-200',
      'In Progress': 'bg-blue-800 text-blue-200',
      'Planned': 'bg-yellow-800 text-yellow-200',
      'On Hold': 'bg-orange-800 text-orange-200',
      'Archived': 'bg-gray-700 text-gray-300'
    };
    return statusColors[status] || 'bg-zinc-700 text-zinc-300';
  };

  return (
    <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">
          Projects
          <span className="ml-2 text-sm font-normal text-zinc-400">({projects.length})</span>
        </h2>
        
        <div className="flex flex-wrap gap-2 items-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-sm bg-zinc-700 text-white hover:bg-zinc-600 border-0 rounded-lg"
          >
            <Tag className="w-4 h-4 mr-1" /> 
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
          
          {isCurrentUser && (
            <button 
              onClick={handleAddProject}
              className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
              disabled={isAddingProject || editingProjectId !== null}
            >
              <Plus className="w-4 h-4 mr-1" /> Add Project
            </button>
          )}
        </div>
      </div>

      {/* Filters and Sorting */}
      {showFilters && (
        <div className="bg-zinc-700 rounded-lg p-4 mb-6 border border-zinc-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Filter by Category</span>
              </label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="select select-bordered w-full bg-zinc-600 border-zinc-500 text-white"
              >
                <option value="all">All Projects</option>
                <option value="featured">Featured Projects</option>
                {allCategories.map((category, index) => (
                  <option key={`cat-${index}`} value={category}>{category}</option>
                ))}
                <optgroup label="Technologies">
                  {allTechnologies.map((tech, index) => (
                    <option key={`tech-${index}`} value={tech}>{tech}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Sort By</span>
              </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full bg-zinc-600 border-zinc-500 text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="featured">Featured First</option>
              </select>
            </div>

            <div className="form-control md:self-end">
              <button 
                onClick={() => {
                  setFilter('all');
                  setSortBy('newest');
                  setShowFilters(false);
                }}
                className="btn btn-sm w-full bg-zinc-600 text-white hover:bg-zinc-500 border-0 rounded-lg mt-6 md:mt-0"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Form (Add/Edit) */}
      {(isAddingProject || editingProjectId !== null) && (
        <div className="bg-zinc-700 rounded-lg p-6 border border-zinc-600 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              {editingProjectId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button 
              onClick={handleCancelEdit}
              className="btn btn-sm btn-ghost text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Project Title *</span>
              </label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Description *</span>
              </label>
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-zinc-600 border-zinc-500 text-white min-h-24"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Category</span>
                </label>
                <select
                  name="category"
                  value={newProject.category}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Desktop App">Desktop App</option>
                  <option value="API/Backend">API/Backend</option>
                  <option value="Library/Framework">Library/Framework</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Game">Game</option>
                  <option value="IoT">IoT</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Status</span>
                </label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planned">Planned</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label flex justify-between">
                  <span className="label-text text-zinc-300">Featured Project</span>
                </label>
                <div className="flex items-center h-12 px-4 bg-zinc-600 border border-zinc-500 rounded-lg">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={newProject.featured}
                    onChange={handleChange}
                    className="toggle toggle-md"
                  />
                  <span className="ml-3 text-zinc-300">
                    {newProject.featured ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Project Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={newProject.imageUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Your Role</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={newProject.role}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                  placeholder="Lead Developer, UI Designer, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Project URL</span>
                </label>
                <input
                  type="url"
                  name="projectUrl"
                  value={newProject.projectUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                  placeholder="https://example.com/project"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Repository URL</span>
                </label>
                <input
                  type="url"
                  name="repoUrl"
                  value={newProject.repoUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">Start Date</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-zinc-300">End Date</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Technologies Used (comma separated) *</span>
              </label>
              <input
                type="text"
                name="technologies"
                value={newProject.technologies.join(', ')}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Key Highlights (one per line)</span>
              </label>
              <textarea
                name="highlights"
                value={newProject.highlights}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-zinc-600 border-zinc-500 text-white min-h-24"
                placeholder="- Implemented user authentication
- Created responsive design
- Optimized database queries for performance"
              />
              <span className="text-xs text-zinc-400 mt-1">Add one highlight per line, start each with a dash (-) for better formatting</span>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-zinc-300">Team/Collaborators</span>
              </label>
              <input
                type="text"
                name="team"
                value={newProject.team}
                onChange={handleChange}
                className="input input-bordered w-full bg-zinc-600 border-zinc-500 text-white"
                placeholder="Solo project or team members"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-sm bg-zinc-600 text-white hover:bg-zinc-500 border-0 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
              >
                <Save className="w-4 h-4 mr-1" /> {editingProjectId ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map(project => (
            <div 
              key={project.id} 
              className={`bg-zinc-700 rounded-lg border ${project.featured ? 'border-yellow-700' : 'border-zinc-600'} overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50`}
            >
              <div className="relative h-48 bg-zinc-600">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-zinc-500" />
                  </div>
                )}
                
                {project.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="badge bg-yellow-700 text-yellow-100 px-2 py-1 text-xs rounded-lg border-0">
                      <Star className="w-3 h-3 mr-1" /> Featured
                    </span>
                  </div>
                )}
                
                {isCurrentUser && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button 
                      onClick={() => handleToggleFeatured(project.id)}
                      className="btn btn-circle btn-xs bg-zinc-800 border-0 hover:bg-zinc-700"
                      title={project.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star className={`w-3 h-3 ${project.featured ? 'text-yellow-300' : 'text-white'}`} />
                    </button>
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="btn btn-circle btn-xs bg-zinc-800 border-0 hover:bg-zinc-700"
                      title="Edit project"
                    >
                      <Edit2 className="w-3 h-3 text-white" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="btn btn-circle btn-xs bg-zinc-800 border-0 hover:bg-zinc-700"
                      title="Delete project"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                )}
                
                {project.status && (
                  <div className="absolute bottom-2 left-2">
                    <span className={`badge ${getStatusColor(project.status)} px-2 py-1 text-xs rounded-lg border-0`}>
                      {project.status}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                  {project.category && (
                    <span className="badge bg-zinc-600 text-zinc-300 px-2 py-0.5 text-xs rounded">
                      {project.category}
                    </span>
                  )}
                </div>
                
                {project.role && (
                  <p className="text-zinc-400 text-xs mb-2">
                    {project.role}
                  </p>
                )}
                
                <p className={`text-zinc-300 text-sm mb-3 ${expandedProject === project.id ? '' : 'line-clamp-2'}`}>
                  {project.description}
                </p>
                
                {/* Dates */}
                {(project.startDate || project.endDate) && (
                  <div className="flex items-center text-zinc-400 text-xs mb-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.startDate && project.endDate ? 
                      `${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}` : 
                      (project.startDate ? 
                        `Started: ${new Date(project.startDate).toLocaleDateString()}` : 
                        `Completed: ${new Date(project.endDate).toLocaleDateString()}`
                      )
                    }
                  </div>
                )}
                
                {/* Expanded content */}
                {expandedProject === project.id && (
                  <div className="mt-4 border-t border-zinc-600 pt-3">
                    {project.highlights && Array.isArray(project.highlights) && project.highlights.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">Key Highlights</h4>
                        <ul className="space-y-1 text-sm text-zinc-300 list-disc list-inside">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.team && (
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-zinc-300">Team</h4>
                        <p className="text-sm text-zinc-300">{project.team}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-3">
                    {project.technologies.slice(0, expandedProject === project.id ? project.technologies.length : 5).map((tech, index) => (
                      <span 
                        key={index} 
                        className="badge bg-zinc-600 text-zinc-300 px-2 py-1 text-xs rounded-lg relative group"
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        {tech}
                        
                        {/* Tooltip */}
                        {hoveredTech === tech && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-zinc-800 text-zinc-200 text-xs py-1 px-2 rounded shadow-lg z-10 pointer-events-none">
                            Filter by {tech}
                          </div>
                        )}
                      </span>
                    ))}
                    {!expandedProject && project.technologies.length > 5 && (
                      <span className="badge bg-zinc-600 text-zinc-300 px-2 py-1 text-xs rounded">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-xs bg-zinc-600 text-zinc-200 hover:bg-zinc-500 border-0 rounded-lg"
                    >
                      <Eye className="w-3 h-3 mr-1" /> Live Demo
                    </a>
                  )}
                  
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-xs bg-zinc-600 text-zinc-200 hover:bg-zinc-500 border-0 rounded-lg"
                    >
                      <GitHub className="w-3 h-3 mr-1" /> Repository
                    </a>
                  )}
                  
                  <button 
                    onClick={() => handleExpandProject(project.id)}
                    className="btn btn-xs bg-zinc-600 text-zinc-200 hover:bg-zinc-500 border-0 rounded-lg ml-auto"
                  >
                    {expandedProject === project.id ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" /> Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" /> More
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-700 rounded-lg p-8 border border-zinc-600 text-center">
          <Image className="w-16 h-16 text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-zinc-400 mb-6">
            {isCurrentUser 
              ? "Showcase your work by adding projects to your profile."
              : "This user hasn't added any projects yet."}
          </p>
          {isCurrentUser && (
            <button 
              onClick={handleAddProject}
              className="btn btn-sm bg-white text-black hover:bg-zinc-200 border-0 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Your First Project
            </button>
          )}
        </div>
      )}
      
      {/* Show count if filtered */}
      {filter !== 'all' && projects.length > 0 && (
        <div className="mt-4 text-zinc-400 text-sm text-center">
          Showing {sortedProjects.length} of {projects.length} projects
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;