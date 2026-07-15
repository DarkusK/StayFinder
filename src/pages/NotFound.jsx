import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import { IconSearch } from '../components/icons.jsx'
import { useI18n } from '../context/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <div className="page">
      <div className="container">
        <EmptyState
          icon={<IconSearch width={28} height={28} />}
          title={t('notFound.title')}
          message={t('notFound.message')}
          action={<Link to="/" className="btn btn-primary">{t('common.backHome')}</Link>}
        />
      </div>
    </div>
  )
}
