'use client'
import React, { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import {
  Box,
  Typography,
  Paper,
  Card,
  Chip,
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
  FormControlLabel
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Visibility as ViewIcon,
  ThumbUp as SuccessIcon,
  ThumbDown as FailedIcon,
  Schedule as PendingIcon,
  SmartToy as AIIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  BarChart as AnalyticsIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'

interface AIRepliedEmail {
  id: string
  originalSender: string
  originalSubject: string
  originalMessage: string
  aiResponse: string
  status: 'success' | 'failed' | 'pending'
  sentDate: string
  responseTime: string
  confidence: number
  category: string
  tone: string
  recipient: string
  opens: number
  clicks: number
  replies: number
}

const aiRepliedData: AIRepliedEmail[] = [
  {
    id: '1',
    originalSender: 'Sarah Johnson - TechCorp',
    originalSubject: 'Partnership Proposal for Q1 2024',
    originalMessage: 'We would like to explore a potential partnership opportunity...',
    aiResponse: 'Thank you for your partnership proposal. We would be delighted to explore this opportunity further...',
    status: 'success',
    sentDate: '2024-01-15 14:30',
    responseTime: '2.3 seconds',
    confidence: 94,
    category: 'Partnership',
    tone: 'Professional',
    recipient: 'sarah.johnson@techcorp.com',
    opens: 3,
    clicks: 1,
    replies: 1
  },
  {
    id: '2',
    originalSender: 'Customer Support - GlobalTech',
    originalSubject: 'Feature Request: Advanced Analytics',
    originalMessage: 'Our team would love to see more advanced analytics features...',
    aiResponse: 'Thank you for your valuable feedback regarding advanced analytics features...',
    status: 'success',
    sentDate: '2024-01-14 11:15',
    responseTime: '1.8 seconds',
    confidence: 88,
    category: 'Feature Request',
    tone: 'Appreciative',
    recipient: 'support@globaltech.com',
    opens: 2,
    clicks: 0,
    replies: 0
  },
  {
    id: '3',
    originalSender: 'Alex Chen - Startup Inc.',
    originalSubject: 'Urgent: Meeting Reschedule Request',
    originalMessage: 'Due to an unexpected conflict, I need to reschedule our meeting...',
    aiResponse: 'No problem at all regarding the meeting reschedule...',
    status: 'pending',
    sentDate: '2024-01-14 09:45',
    responseTime: '3.1 seconds',
    confidence: 95,
    category: 'Scheduling',
    tone: 'Accommodating',
    recipient: 'alex.chen@startup.com',
    opens: 1,
    clicks: 0,
    replies: 0
  },
  {
    id: '4',
    originalSender: 'Marketing Team - BrandCo',
    originalSubject: 'Collaboration on Upcoming Webinar',
    originalMessage: 'We would like to invite you to be a guest speaker...',
    aiResponse: 'Thank you for the kind invitation to speak at your upcoming webinar...',
    status: 'failed',
    sentDate: '2024-01-13 16:20',
    responseTime: '4.2 seconds',
    confidence: 76,
    category: 'Speaking Engagement',
    tone: 'Enthusiastic',
    recipient: 'marketing@brandco.com',
    opens: 0,
    clicks: 0,
    replies: 0
  },
  {
    id: '5',
    originalSender: 'James Wilson - Enterprise Corp',
    originalSubject: 'Contract Renewal Discussion',
    originalMessage: 'I would like to discuss the renewal of our current contract...',
    aiResponse: 'Thank you for reaching out about contract renewal. I would be happy to discuss this further...',
    status: 'success',
    sentDate: '2024-01-13 10:30',
    responseTime: '2.1 seconds',
    confidence: 91,
    category: 'Sales',
    tone: 'Professional',
    recipient: 'james.wilson@enterprise.com',
    opens: 5,
    clicks: 2,
    replies: 1
  }
]

const statusConfig = {
  success: { color: 'success', icon: <SuccessIcon />, label: 'Delivered' },
  failed: { color: 'error', icon: <FailedIcon />, label: 'Failed' },
  pending: { color: 'warning', icon: <PendingIcon />, label: 'Pending' }
} as const

export default function AiRepliedPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'confidence' | 'category'>('date')
  const [selectedEmail, setSelectedEmail] = useState<AIRepliedEmail | null>(aiRepliedData[0])
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null)
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const filteredEmails = aiRepliedData.filter(email => {
    const matchesSearch = 
      email.originalSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.originalSender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || email.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence
      case 'category':
        return a.category.localeCompare(b.category)
      case 'date':
      default:
        return new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime()
    }
  })

  const paginatedEmails = sortedEmails.slice(
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

  const getStatusCount = (status: AIRepliedEmail['status']) => 
    aiRepliedData.filter(email => email.status === status).length

  const totalSuccess = getStatusCount('success')
  const totalFailed = getStatusCount('failed')
  const totalPending = getStatusCount('pending')

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              AI Replied Mails
            </Typography>
            <Typography color="text.secondary">
              Track and analyze all emails automatically replied by Apers AI
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
            <Button startIcon={<RefreshIcon />} variant="outlined" size="small">
              Refresh
            </Button>
            <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
              Export
            </Button>
          </Box>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light' }}>
                <SuccessIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {totalSuccess}
                </Typography>
                <Typography color="text.secondary">Successful Replies</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light' }}>
                <PendingIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {totalPending}
                </Typography>
                <Typography color="text.secondary">Pending Delivery</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'error.light' }}>
                <FailedIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="error.main">
                  {totalFailed}
                </Typography>
                <Typography color="text.secondary">Failed Replies</Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <AIIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {aiRepliedData.length}
                </Typography>
                <Typography color="text.secondary">Total AI Replies</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Controls */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search AI replies..."
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
              onClick={(e) => setFilterAnchor(e.currentTarget)}
              variant="outlined"
              size="small"
            >
              Filter: {filterStatus === 'all' ? 'All Status' : filterStatus}
            </Button>
            
            <Button
              startIcon={<SortIcon />}
              onClick={(e) => setSortAnchor(e.currentTarget)}
              variant="outlined"
              size="small"
            >
              Sort: {sortBy}
            </Button>

            <Box sx={{ flex: 1 }} />
            
            <Typography variant="body2" color="text.secondary">
              {filteredEmails.length} replies found
            </Typography>
          </Box>
        </Paper>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
        >
          <MenuItem onClick={() => { setFilterStatus('all'); setFilterAnchor(null) }}>
            All Status
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('success'); setFilterAnchor(null) }}>
            Successful
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('failed'); setFilterAnchor(null) }}>
            Failed
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('pending'); setFilterAnchor(null) }}>
            Pending
          </MenuItem>
        </Menu>

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={() => setSortAnchor(null)}
        >
          <MenuItem onClick={() => { setSortBy('date'); setSortAnchor(null) }}>
            Most Recent
          </MenuItem>
          <MenuItem onClick={() => { setSortBy('confidence'); setSortAnchor(null) }}>
            Highest Confidence
          </MenuItem>
          <MenuItem onClick={() => { setSortBy('category'); setSortAnchor(null) }}>
            Category
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
                      <TableCell>Recipient</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Confidence</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Date</TableCell>
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
                              {email.originalSubject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {email.originalSender}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {email.recipient}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={statusConfig[email.status].icon}
                            label={statusConfig[email.status].label}
                            color={statusConfig[email.status].color}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {email.confidence}%
                            </Typography>
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 4, 
                                bgcolor: 'grey.300',
                                borderRadius: 2,
                                overflow: 'hidden'
                              }}
                            >
                              <Box 
                                sx={{ 
                                  width: `${email.confidence}%`, 
                                  height: '100%',
                                  bgcolor: email.confidence > 85 ? 'success.main' : 'warning.main'
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={email.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(email.sentDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(email.sentDate).toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <ViewIcon />
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
                  count={sortedEmails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            ) : (
              // Card View
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {paginatedEmails.map((email) => (
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            {email.originalSubject}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            From: {email.originalSender}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            To: {email.recipient}
                          </Typography>
                        </Box>
                        <Chip 
                          icon={statusConfig[email.status].icon}
                          label={statusConfig[email.status].label}
                          color={statusConfig[email.status].color}
                          size="small"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip label={email.category} size="small" variant="outlined" />
                        <Chip 
                          label={`${email.confidence}% confidence`} 
                          size="small" 
                          color={email.confidence > 85 ? 'success' : 'warning'}
                          variant="outlined"
                        />
                        <Chip label={email.tone} size="small" variant="outlined" />
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {email.sentDate} • {email.responseTime}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Opens">
                            <Chip icon={<EmailIcon />} label={email.opens} size="small" variant="outlined" />
                          </Tooltip>
                          <Tooltip title="Clicks">
                            <Chip icon={<AnalyticsIcon />} label={email.clicks} size="small" variant="outlined" />
                          </Tooltip>
                          <Tooltip title="Replies">
                            <Chip icon={<PersonIcon />} label={email.replies} size="small" variant="outlined" />
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
              Reply Details
            </Typography>
            
            {selectedEmail ? (
              <Fade in>
                <Paper sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {selectedEmail.originalSubject}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          icon={statusConfig[selectedEmail.status].icon}
                          label={statusConfig[selectedEmail.status].label}
                          color={statusConfig[selectedEmail.status].color}
                        />
                        <Chip label={selectedEmail.category} variant="outlined" />
                        <Chip label={`${selectedEmail.confidence}% confidence`} variant="outlined" />
                      </Box>
                    </Box>
                    <AIIcon color="primary" sx={{ fontSize: 32 }} />
                  </Box>

                  {/* Original Email */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" />
                      ORIGINAL MESSAGE
                    </Typography>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        From: {selectedEmail.originalSender}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Subject: {selectedEmail.originalSubject}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">
                        {selectedEmail.originalMessage}
                      </Typography>
                    </Card>
                  </Box>

                  {/* AI Response */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AIIcon fontSize="small" />
                      AI RESPONSE
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        borderColor: 'success.light',
                        bgcolor: 'success.50',
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedEmail.aiResponse}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Analytics & Metadata */}
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Response Time
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {selectedEmail.responseTime}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Sent Date
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {selectedEmail.sentDate}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Tone
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {selectedEmail.tone}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Engagement Metrics */}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    ENGAGEMENT METRICS
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <EmailIcon color="primary" />
                      <Typography variant="h6" fontWeight={600}>
                        {selectedEmail.opens}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Opens
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <AnalyticsIcon color="primary" />
                      <Typography variant="h6" fontWeight={600}>
                        {selectedEmail.clicks}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Clicks
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <PersonIcon color="primary" />
                      <Typography variant="h6" fontWeight={600}>
                        {selectedEmail.replies}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Replies
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            ) : (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <AIIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Select an email to view details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose an AI-replied email from the list to see the full conversation and analytics
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  )
}