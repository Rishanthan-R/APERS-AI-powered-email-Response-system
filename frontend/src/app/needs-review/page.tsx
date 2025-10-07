'use client'
import React, { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Card,
  Button,
  IconButton,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Badge,
  Fade,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as RejectIcon,
  Schedule as PendingIcon,
  PriorityHigh as PriorityIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreIcon,
  AddComment as CommentIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  Lightbulb as SuggestionIcon,
  AttachFile as AttachmentIcon
} from '@mui/icons-material'

interface ReviewEmail {
  id: string
  sender: string
  senderEmail: string
  subject: string
  originalMessage: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-review' | 'resolved'
  assignedDate: string
  dueDate: string
  category: string
  tags: string[]
  aiConfidence: number
  suggestedAction: string
  notes?: string
  attachments: number
  responseRequired: boolean
}

const reviewEmailsData: ReviewEmail[] = [
  {
    id: '1',
    sender: 'Sarah Johnson - TechCorp',
    senderEmail: 'sarah.johnson@techcorp.com',
    subject: 'Urgent: Contract Terms Clarification',
    originalMessage: 'We need immediate clarification on section 4.2 of the contract regarding delivery timelines and penalty clauses. The current wording seems ambiguous and could lead to misunderstandings.',
    priority: 'high',
    status: 'pending',
    assignedDate: '2024-01-15 09:30',
    dueDate: '2024-01-16 18:00',
    category: 'Legal',
    tags: ['Missing Info', 'Urgent', 'Contract'],
    aiConfidence: 45,
    suggestedAction: 'Consult legal team and provide clear definitions for ambiguous terms',
    attachments: 2,
    responseRequired: true
  },
  {
    id: '2',
    sender: 'Alex Chen - Startup Inc.',
    senderEmail: 'alex.chen@startup.com',
    subject: 'Pricing Negotiation for Bulk Order',
    originalMessage: 'We are interested in placing a bulk order but find the pricing unclear for quantities above 500 units. Can you provide tiered pricing and clarify discount structures?',
    priority: 'medium',
    status: 'in-review',
    assignedDate: '2024-01-14 14:20',
    dueDate: '2024-01-17 17:00',
    category: 'Sales',
    tags: ['Unclear Question', 'Pricing'],
    aiConfidence: 62,
    suggestedAction: 'Prepare tiered pricing table and discount schedule',
    notes: 'Customer has potential for long-term partnership',
    attachments: 1,
    responseRequired: true
  },
  {
    id: '3',
    sender: 'Legal Team - Partners LLC',
    senderEmail: 'legal@partnersllc.com',
    subject: 'NDA Review Request',
    originalMessage: 'Please review the attached NDA and provide your feedback on the confidentiality clauses. We need to ensure compliance with international data protection regulations.',
    priority: 'high',
    status: 'pending',
    assignedDate: '2024-01-14 11:15',
    dueDate: '2024-01-18 12:00',
    category: 'Legal',
    tags: ['Escalated', 'Compliance'],
    aiConfidence: 38,
    suggestedAction: 'Forward to legal department for expert review',
    attachments: 3,
    responseRequired: false
  },
  {
    id: '4',
    sender: 'Marketing Department - BrandCo',
    senderEmail: 'marketing@brandco.com',
    subject: 'Collaboration Proposal Feedback',
    originalMessage: 'We have some concerns about the proposed collaboration timeline and resource allocation. Could you review our attached counter-proposal?',
    priority: 'medium',
    status: 'pending',
    assignedDate: '2024-01-13 16:45',
    dueDate: '2024-01-19 15:00',
    category: 'Partnership',
    tags: ['Missing Info', 'Timeline'],
    aiConfidence: 55,
    suggestedAction: 'Schedule meeting to discuss timeline and resource concerns',
    attachments: 1,
    responseRequired: true
  },
  {
    id: '5',
    sender: 'Technical Support - Enterprise Corp',
    senderEmail: 'support@enterprise.com',
    subject: 'API Integration Complexity',
    originalMessage: 'Our team is facing challenges with the API integration documentation. Some endpoints seem to be missing proper authentication examples and error handling guidelines.',
    priority: 'low',
    status: 'resolved',
    assignedDate: '2024-01-12 10:30',
    dueDate: '2024-01-15 14:00',
    category: 'Technical',
    tags: ['Documentation', 'Resolved'],
    aiConfidence: 71,
    suggestedAction: 'Update API documentation with detailed examples',
    notes: 'Documentation updated and sent to customer',
    attachments: 0,
    responseRequired: false
  }
]

const priorityConfig = {
  high: { color: 'error' as const, icon: <PriorityIcon />, label: 'High Priority' },
  medium: { color: 'warning' as const, icon: <WarningIcon />, label: 'Medium Priority' },
  low: { color: 'success' as const, icon: <CheckCircleIcon />, label: 'Low Priority' }
}

const statusConfig = {
  pending: { color: 'warning' as const, label: 'Pending Review' },
  'in-review': { color: 'info' as const, label: 'In Review' },
  resolved: { color: 'success' as const, label: 'Resolved' }
}

export default function NeedsReviewPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedEmail, setSelectedEmail] = useState<ReviewEmail | null>(reviewEmailsData[0])
  const [priorityAnchor, setPriorityAnchor] = useState<null | HTMLElement>(null)
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card')
  const [actionDialog, setActionDialog] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const filteredEmails = reviewEmailsData.filter(email => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.senderEmail.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPriority = filterPriority === 'all' || email.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || email.status === filterStatus
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const paginatedEmails = filteredEmails.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getPriorityCount = (priority: ReviewEmail['priority']) => 
    reviewEmailsData.filter(email => email.priority === priority).length

  const getStatusCount = (status: ReviewEmail['status']) => 
    reviewEmailsData.filter(email => email.status === status).length

  const totalHigh = getPriorityCount('high')
  const totalMedium = getPriorityCount('medium')
  const totalLow = getPriorityCount('low')

  const handleApprove = (emailId: string) => {
    // Implement approve logic
    console.log('Approving email:', emailId)
    setActionDialog(false)
  }

  const handleReject = (emailId: string) => {
    // Implement reject logic
    console.log('Rejecting email:', emailId)
    setActionDialog(false)
  }

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBackStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Needs Review
            </Typography>
            <Typography color="text.secondary">
              Emails requiring your attention and manual review
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={viewMode === 'card'}
                  onChange={(e) => setViewMode(e.target.checked ? 'card' : 'table')}
                  color="primary"
                />
              }
              label="Card View"
            />
            <Button 
              startIcon={<AssignmentIcon />} 
              variant="contained" 
              color="primary"
              onClick={() => setActionDialog(true)}
            >
              Take Action
            </Button>
          </Box>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200, borderLeft: '4px solid', borderColor: 'error.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'error.light' }}>
                <PriorityIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="error.main">
                  {totalHigh}
                </Typography>
                <Typography color="text.secondary">High Priority</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200, borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light' }}>
                <WarningIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {totalMedium}
                </Typography>
                <Typography color="text.secondary">Medium Priority</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200, borderLeft: '4px solid', borderColor: 'success.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light' }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {totalLow}
                </Typography>
                <Typography color="text.secondary">Low Priority</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200, borderLeft: '4px solid', borderColor: 'primary.main' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <EmailIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {reviewEmailsData.length}
                </Typography>
                <Typography color="text.secondary">Total Assigned</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Controls */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search review items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
              size="small"
            />
            
            <Button
              startIcon={<FilterListIcon />}
              onClick={(e) => setPriorityAnchor(e.currentTarget)}
              variant="outlined"
              size="small"
            >
              Priority: {filterPriority === 'all' ? 'All' : filterPriority}
            </Button>
            
            <Button
              startIcon={<SortIcon />}
              onClick={(e) => setStatusAnchor(e.currentTarget)}
              variant="outlined"
              size="small"
            >
              Status: {filterStatus === 'all' ? 'All' : filterStatus}
            </Button>

            <Box sx={{ flex: 1 }} />
            
            <Typography variant="body2" color="text.secondary">
              {filteredEmails.length} items need review
            </Typography>
          </Box>
        </Paper>

        {/* Priority Filter Menu */}
        <Menu
          anchorEl={priorityAnchor}
          open={Boolean(priorityAnchor)}
          onClose={() => setPriorityAnchor(null)}
        >
          <MenuItem onClick={() => { setFilterPriority('all'); setPriorityAnchor(null) }}>
            All Priorities
          </MenuItem>
          <MenuItem onClick={() => { setFilterPriority('high'); setPriorityAnchor(null) }}>
            High Priority
          </MenuItem>
          <MenuItem onClick={() => { setFilterPriority('medium'); setPriorityAnchor(null) }}>
            Medium Priority
          </MenuItem>
          <MenuItem onClick={() => { setFilterPriority('low'); setPriorityAnchor(null) }}>
            Low Priority
          </MenuItem>
        </Menu>

        {/* Status Filter Menu */}
        <Menu
          anchorEl={statusAnchor}
          open={Boolean(statusAnchor)}
          onClose={() => setStatusAnchor(null)}
        >
          <MenuItem onClick={() => { setFilterStatus('all'); setStatusAnchor(null) }}>
            All Status
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('pending'); setStatusAnchor(null) }}>
            Pending Review
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('in-review'); setStatusAnchor(null) }}>
            In Review
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('resolved'); setStatusAnchor(null) }}>
            Resolved
          </MenuItem>
        </Menu>

        {/* Content Area */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Emails List */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {viewMode === 'table' ? (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject & Sender</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>AI Confidence</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedEmails.map((email) => (
                      <TableRow 
                        key={email.id}
                        hover
                        sx={{ 
                          cursor: 'pointer',
                          backgroundColor: selectedEmail?.id === email.id ? 'action.selected' : 'inherit'
                        }}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {email.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {email.sender}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={priorityConfig[email.priority].icon}
                            label={priorityConfig[email.priority].label}
                            color={priorityConfig[email.priority].color}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusConfig[email.status].label}
                            color={statusConfig[email.status].color}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label={email.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {new Date(email.dueDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(email.dueDate).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={email.aiConfidence > 60 ? 'success.main' : email.aiConfidence > 40 ? 'warning.main' : 'error.main'}
                            >
                              {email.aiConfidence}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Review Email">
                            <IconButton size="small">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Notes">
                            <IconButton size="small">
                              <CommentIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredEmails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            ) : (
              // Card View
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredEmails.map((email) => (
                  <Fade in key={email.id}>
                    <Card 
                      sx={{ 
                        p: 2, 
                        borderRadius: 3,
                        cursor: 'pointer',
                        border: selectedEmail?.id === email.id ? '2px solid' : '1px solid',
                        borderColor: selectedEmail?.id === email.id ? 'primary.main' : 'divider',
                        backgroundColor: selectedEmail?.id === email.id ? 'action.hover' : 'background.paper',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.light',
                          transform: 'translateY(-1px)',
                          boxShadow: 4
                        }
                      }}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            {email.subject}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            From: {email.sender}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                          <Chip 
                            icon={priorityConfig[email.priority].icon}
                            label={priorityConfig[email.priority].label}
                            color={priorityConfig[email.priority].color}
                            size="small"
                          />
                          <Chip 
                            label={statusConfig[email.status].label}
                            color={statusConfig[email.status].color}
                            size="small"
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {email.tags.map((tag) => (
                          <Chip 
                            key={tag}
                            label={tag} 
                            size="small" 
                            color={
                              tag === 'Missing Info' ? 'warning' :
                              tag === 'Unclear Question' ? 'error' :
                              tag === 'Escalated' ? 'info' : 'default'
                            }
                            variant="outlined"
                          />
                        ))}
                        <Chip label={email.category} size="small" variant="outlined" />
                        {email.attachments > 0 && (
                          <Chip 
                            icon={<AttachmentIcon />}
                            label={`${email.attachments} files`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Due: {new Date(email.dueDate).toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            AI Confidence: {email.aiConfidence}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {email.responseRequired && (
                            <Chip label="Response Required" size="small" color="error" />
                          )}
                          <Tooltip title="AI Suggestion">
                            <IconButton size="small">
                              <SuggestionIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Card>
                  </Fade>
                ))}
              </Box>
            )}
          </Box>

          {/* Email Details Panel */}
          <Box sx={{ flex: 1, minWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              Review Details
            </Typography>
            
            {selectedEmail ? (
              <Fade in>
                <Paper sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {selectedEmail.subject}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        <Chip 
                          icon={priorityConfig[selectedEmail.priority].icon}
                          label={priorityConfig[selectedEmail.priority].label}
                          color={priorityConfig[selectedEmail.priority].color}
                        />
                        <Chip 
                          label={statusConfig[selectedEmail.status].label}
                          color={statusConfig[selectedEmail.status].color}
                        />
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {selectedEmail.sender.charAt(0)}
                    </Avatar>
                  </Box>

                  {/* Sender Info */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      From: {selectedEmail.sender} ({selectedEmail.senderEmail})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Assigned: {new Date(selectedEmail.assignedDate).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(selectedEmail.dueDate).toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Original Message */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      ORIGINAL MESSAGE
                    </Typography>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2">
                        {selectedEmail.originalMessage}
                      </Typography>
                    </Card>
                  </Box>

                  {/* AI Analysis */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SuggestionIcon fontSize="small" />
                      AI ANALYSIS & SUGGESTION
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        borderColor: 'warning.light',
                        bgcolor: 'warning.50',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          Confidence Level: {selectedEmail.aiConfidence}%
                        </Typography>
                        <Chip 
                          label={selectedEmail.aiConfidence > 60 ? 'High' : selectedEmail.aiConfidence > 40 ? 'Medium' : 'Low'} 
                          size="small"
                          color={selectedEmail.aiConfidence > 60 ? 'success' : selectedEmail.aiConfidence > 40 ? 'warning' : 'error'}
                        />
                      </Box>
                      <Typography variant="body2">
                        <strong>Suggested Action:</strong> {selectedEmail.suggestedAction}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Tags & Metadata */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      TAGS & CATEGORY
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedEmail.tags.map((tag) => (
                        <Chip 
                          key={tag}
                          label={tag} 
                          size="small"
                          color={
                            tag === 'Missing Info' ? 'warning' :
                            tag === 'Unclear Question' ? 'error' :
                            tag === 'Escalated' ? 'info' : 'default'
                          }
                        />
                      ))}
                      <Chip label={selectedEmail.category} size="small" variant="outlined" />
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      color="success"
                      onClick={() => handleApprove(selectedEmail.id)}
                    >
                      Approve Response
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      color="primary"
                    >
                      Edit Draft
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<RejectIcon />}
                      color="error"
                      onClick={() => handleReject(selectedEmail.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CommentIcon />}
                    >
                      Add Notes
                    </Button>
                  </Box>

                  {/* Notes Section */}
                  {selectedEmail.notes && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        NOTES
                      </Typography>
                      <Typography variant="body2">
                        {selectedEmail.notes}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Fade>
            ) : (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Select an item to review
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose an email from the list to see details and take action
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Action Dialog */}
        <Dialog 
          open={actionDialog} 
          onClose={() => setActionDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight={600}>
              Review Workflow
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Analyze Email Content</StepLabel>
                <StepContent>
                  <Typography>
                    Review the email content, identify key issues, and understand the context.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Evaluate AI Suggestion</StepLabel>
                <StepContent>
                  <Typography>
                    Assess the AI-generated response and confidence score. Determine if manual intervention is needed.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                    <Button
                      onClick={handleBackStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Take Action</StepLabel>
                <StepContent>
                  <Typography>
                    Choose to approve the AI response, edit it, or reject and provide manual input.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Complete Review
                    </Button>
                    <Button
                      onClick={handleBackStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  )
}