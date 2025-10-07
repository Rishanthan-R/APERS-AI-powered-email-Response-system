'use client'
import React, { useState, useEffect } from 'react'
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
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Edit as EditIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  MoreVert as MoreIcon,
  SmartToy as AIIcon,
  Schedule as ScheduleIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Close as CloseIcon
} from '@mui/icons-material'

import { useEmailApi, useAiApi } from '@/hooks'

interface AIDraft {
  id: string
  originalSender: string
  originalSubject: string
  originalMessage: string
  aiDraft: string
  status: 'pending' | 'approved' | 'edited' | 'sent'
  confidence: number
  timestamp: string
  category: string
  suggestedTone: string
  wordCount: number
}

// We'll move this to our API later
const aiDraftsData: AIDraft[] = [
  {
    id: '1',
    originalSender: 'Sarah Johnson - TechCorp',
    originalSubject: 'Partnership Proposal for Q1 2024',
    originalMessage: 'We would like to explore a potential partnership opportunity for the upcoming quarter. Our team has been following your work and we believe there is strong synergy between our companies.',
    aiDraft: `Dear Sarah,

Thank you for reaching out regarding the partnership opportunity for Q1 2024. We're impressed with TechCorp's recent initiatives and would be delighted to explore this further.

Our team would appreciate learning more about your specific goals and how you envision our collaboration. Would you be available for a brief call next week to discuss this in more detail?

Best regards,
[Your Name]`,
    status: 'pending',
    confidence: 92,
    timestamp: '2024-01-15 14:30',
    category: 'Partnership',
    suggestedTone: 'Professional & Collaborative',
    wordCount: 85
  },
  {
    id: '2',
    originalSender: 'Customer Support - GlobalTech',
    originalSubject: 'Feature Request: Advanced Analytics',
    originalMessage: 'Our team has been using your platform and we would love to see more advanced analytics features, particularly around user behavior tracking.',
    aiDraft: `Hello GlobalTech Team,

Thank you for your valuable feedback regarding advanced analytics features. We're currently working on enhancing our analytics capabilities, and user behavior tracking is definitely on our roadmap.

I've shared your request with our product team for consideration in our upcoming development cycles. We'll keep you updated on our progress.

Warm regards,
[Your Name]`,
    status: 'approved',
    confidence: 88,
    timestamp: '2024-01-14 11:15',
    category: 'Feature Request',
    suggestedTone: 'Appreciative & Forward-Looking',
    wordCount: 67
  },
  {
    id: '3',
    originalSender: 'Alex Chen - Startup Inc.',
    originalSubject: 'Urgent: Meeting Reschedule Request',
    originalMessage: 'Due to an unexpected conflict, I need to reschedule our meeting scheduled for tomorrow. Could we move it to later this week?',
    aiDraft: `Hi Alex,

No problem at all regarding the meeting reschedule. I understand unexpected conflicts can arise.

I'm available on Thursday at 2:00 PM or Friday morning at 10:00 AM. Please let me know which time works better for you, and I'll send over the updated calendar invitation.

Best,
[Your Name]`,
    status: 'edited',
    confidence: 95,
    timestamp: '2024-01-14 09:45',
    category: 'Scheduling',
    suggestedTone: 'Accommodating & Helpful',
    wordCount: 58
  },
  {
    id: '4',
    originalSender: 'Marketing Team - BrandCo',
    originalSubject: 'Collaboration on Upcoming Webinar',
    originalMessage: 'We would like to invite you to be a guest speaker in our upcoming webinar about digital transformation trends.',
    aiDraft: `Dear Marketing Team,

Thank you for the kind invitation to speak at your upcoming webinar on digital transformation trends. This sounds like an excellent opportunity.

Could you please share more details about the expected audience, webinar format, and potential dates? This will help me prepare accordingly.

Looking forward to it!
[Your Name]`,
    status: 'sent',
    confidence: 90,
    timestamp: '2024-01-13 16:20',
    category: 'Speaking Engagement',
    suggestedTone: 'Enthusiastic & Professional',
    wordCount: 52
  }
]

const statusColors = {
  pending: 'warning',
  approved: 'success',
  edited: 'info',
  sent: 'secondary'
} as const

const statusIcons = {
  pending: <PendingIcon />,
  approved: <ApprovedIcon />,
  edited: <EditIcon />,
  sent: <SendIcon />
}

// Mock API hooks for now - we'll create the real ones next
const useMockEmailApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDrafts = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      return aiDraftsData;
    } catch (err) {
      setError('Failed to load drafts');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendDraft = async (draftId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      console.log('Draft sent:', draftId);
      return { success: true };
    } catch (err) {
      setError('Failed to send draft');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteDraft = async (draftId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      console.log('Draft deleted:', draftId);
      return { success: true };
    } catch (err) {
      setError('Failed to delete draft');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    clearError,
    getDrafts,
    sendDraft,
    deleteDraft,
  };
};

export default function DraftsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'confidence' | 'category'>('date')
  const [selectedDraft, setSelectedDraft] = useState<AIDraft | null>(null)
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null)
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null)
  const [drafts, setDrafts] = useState<AIDraft[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  // Use our mock API hooks
  const { loading, error, clearError, getDrafts, sendDraft, deleteDraft } = useMockEmailApi()

  // Load drafts on component mount
  useEffect(() => {
    loadDrafts()
  }, [])

  const loadDrafts = async () => {
    const draftsData = await getDrafts()
    if (draftsData) {
      setDrafts(draftsData)
      if (draftsData.length > 0 && !selectedDraft) {
        setSelectedDraft(draftsData[0])
      }
    }
  }

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleSendDraft = async (draftId: string) => {
    const result = await sendDraft(draftId)
    if (result?.success) {
      // Update local state
      setDrafts(prev => prev.map(draft => 
        draft.id === draftId ? { ...draft, status: 'sent' as const } : draft
      ))
      if (selectedDraft?.id === draftId) {
        setSelectedDraft(prev => prev ? { ...prev, status: 'sent' as const } : null)
      }
      showSnackbar('Draft sent successfully!')
    }
  }

  const handleEditDraft = (draftId: string) => {
    // Implement edit logic
    console.log('Editing draft:', draftId)
    showSnackbar('Edit mode activated')
  }

  const handleApproveDraft = (draftId: string) => {
    // Update local state
    setDrafts(prev => prev.map(draft => 
      draft.id === draftId ? { ...draft, status: 'approved' as const } : draft
    ))
    if (selectedDraft?.id === draftId) {
      setSelectedDraft(prev => prev ? { ...prev, status: 'approved' as const } : null)
    }
    showSnackbar('Draft approved!')
  }

  const handleDeleteDraft = async (draftId: string) => {
    const result = await deleteDraft(draftId)
    if (result?.success) {
      // Update local state
      setDrafts(prev => prev.filter(draft => draft.id !== draftId))
      if (selectedDraft?.id === draftId) {
        setSelectedDraft(drafts.length > 1 ? drafts.find(d => d.id !== draftId) || null : null)
      }
      showSnackbar('Draft deleted successfully!')
    }
  }

  const handleCopyDraft = (draftText: string) => {
    navigator.clipboard.writeText(draftText)
    showSnackbar('Draft copied to clipboard!')
  }

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = 
      draft.originalSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.originalSender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.aiDraft.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || draft.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const sortedDrafts = [...filteredDrafts].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence
      case 'category':
        return a.category.localeCompare(b.category)
      case 'date':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
  })

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              AI Drafts
            </Typography>
            <Typography color="text.secondary">
              Review, edit, and send AI-generated email responses
            </Typography>
          </Box>
          <Badge badgeContent={drafts.length} color="primary">
            <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Badge>
        </Box>

        {/* Loading State */}
        {loading && drafts.length === 0 && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            action={
              <IconButton size="small" onClick={clearError}>
                <CloseIcon />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Controls */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search drafts..."
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
          <MenuItem onClick={() => { setFilterStatus('pending'); setFilterAnchor(null) }}>
            Pending Review
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('approved'); setFilterAnchor(null) }}>
            Approved
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('edited'); setFilterAnchor(null) }}>
            Edited
          </MenuItem>
          <MenuItem onClick={() => { setFilterStatus('sent'); setFilterAnchor(null) }}>
            Sent
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

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Drafts List */}
          <Box sx={{ flex: 1, minWidth: 400 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Draft Responses
              <Chip label={sortedDrafts.length} size="small" color="primary" />
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sortedDrafts.map((draft) => (
                <Fade in key={draft.id}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      borderRadius: 3,
                      cursor: 'pointer',
                      border: selectedDraft?.id === draft.id ? '2px solid' : '1px solid',
                      borderColor: selectedDraft?.id === draft.id ? 'primary.main' : 'divider',
                      backgroundColor: selectedDraft?.id === draft.id ? 'action.hover' : 'background.paper',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.light',
                        transform: 'translateY(-1px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => setSelectedDraft(draft)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ maxWidth: '70%' }}>
                        {draft.originalSubject}
                      </Typography>
                      <Chip 
                        icon={statusIcons[draft.status]}
                        label={draft.status}
                        color={statusColors[draft.status]}
                        size="small"
                      />
                    </Box>
                    
                    <Typography color="text.secondary" variant="body2" noWrap sx={{ mb: 1 }}>
                      From: {draft.originalSender}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      <Chip label={draft.category} size="small" variant="outlined" />
                      <Chip 
                        label={`${draft.confidence}% confident`} 
                        size="small" 
                        color={draft.confidence > 85 ? 'success' : 'warning'}
                        variant="outlined"
                      />
                      <Chip label={draft.suggestedTone} size="small" variant="outlined" />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {draft.aiDraft.split('\n')[0]}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {draft.timestamp} • {draft.wordCount} words
                      </Typography>
                      <AIIcon fontSize="small" color="action" />
                    </Box>
                  </Card>
                </Fade>
              ))}
            </Box>
          </Box>

          {/* Draft Preview & Actions */}
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Typography variant="h6" gutterBottom>
              Draft Preview
            </Typography>
            
            {selectedDraft ? (
              <Fade in>
                <Paper sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                  {/* Original Email */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      ORIGINAL MESSAGE
                    </Typography>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        From: {selectedDraft.originalSender}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Subject: {selectedDraft.originalSubject}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">
                        {selectedDraft.originalMessage}
                      </Typography>
                    </Card>
                  </Box>

                  {/* AI Draft */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        AI-GENERATED RESPONSE
                      </Typography>
                      <Chip 
                        label={`${selectedDraft.confidence}% confidence`}
                        size="small"
                        color={selectedDraft.confidence > 85 ? 'success' : 'warning'}
                      />
                    </Box>
                    
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        borderColor: 'primary.light',
                        bgcolor: 'primary.50',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <AIIcon color="primary" />
                      </Box>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedDraft.aiDraft}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<SendIcon />}
                      onClick={() => handleSendDraft(selectedDraft.id)}
                      disabled={selectedDraft.status === 'sent' || loading}
                    >
                      {loading ? 'Sending...' : 'Send Response'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditDraft(selectedDraft.id)}
                      disabled={loading}
                    >
                      Edit Draft
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CopyIcon />}
                      onClick={() => handleCopyDraft(selectedDraft.aiDraft)}
                      disabled={loading}
                    >
                      Copy Text
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ScheduleIcon />}
                      disabled={loading}
                    >
                      Schedule
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<ApprovedIcon />}
                      onClick={() => handleApproveDraft(selectedDraft.id)}
                      disabled={selectedDraft.status === 'approved' || loading}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteDraft(selectedDraft.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </Box>

                  {/* Draft Metadata */}
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      DRAFT METADATA
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Category</Typography>
                        <Typography variant="body2">{selectedDraft.category}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Suggested Tone</Typography>
                        <Typography variant="body2">{selectedDraft.suggestedTone}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Word Count</Typography>
                        <Typography variant="body2">{selectedDraft.wordCount}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Generated</Typography>
                        <Typography variant="body2">{selectedDraft.timestamp}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            ) : (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <AIIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {drafts.length === 0 ? 'No drafts available' : 'Select a draft to preview'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {drafts.length === 0 
                    ? 'AI-generated drafts will appear here for review' 
                    : 'Choose an AI-generated draft from the list to review and take action'
                  }
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  )
}