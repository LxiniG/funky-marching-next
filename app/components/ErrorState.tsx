import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    title = "Etwas ist schiefgelaufen",
    message = "Die Daten konnten nicht geladen werden. Bitte versuche es später erneut.",
    onRetry,
    showRetry = true
}) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <AlertCircle className={styles.errorIcon} size={48} />
                <h2 className={styles.errorTitle}>{title}</h2>
                <p className={styles.errorMessage}>{message}</p>
                {showRetry && onRetry && (
                    <Button onClick={onRetry} variant="outline" className={styles.retryButton}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Erneut versuchen
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ErrorState;
