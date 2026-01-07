import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: number // percentage change, positive = up, negative = down
  trendLabel?: string
  icon?: React.ReactNode
  className?: string
  valueClassName?: string
  showGauge?: boolean
  gaugeValue?: number // 0-100
  gaugeColor?: 'green' | 'yellow' | 'red' | 'blue'
  variant?: 'default' | 'compact'
  color?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  className,
  valueClassName,
  showGauge,
  gaugeValue = 0,
  gaugeColor = 'blue',
  variant = 'default',
  color = 'primary',
}: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === undefined) return null
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (trend === undefined) return ''
    if (trend > 0) return 'text-green-500'
    if (trend < 0) return 'text-red-500'
    return 'text-muted-foreground'
  }

  const gaugeColors = {
    green: 'stroke-green-500',
    yellow: 'stroke-yellow-500',
    red: 'stroke-red-500',
    blue: 'stroke-blue-500',
  }

  const colorStyles = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    success: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
    info: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    warning: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
    danger: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
  }

  if (variant === 'compact') {
    return (
      <Card className={cn('flex flex-row items-center justify-between p-4 shadow-sm', className)}>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline gap-2">
            <div className={cn('text-2xl font-bold', valueClassName)}>
              {typeof value === 'number'
                ? new Intl.NumberFormat('vi-VN').format(value)
                : value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {icon && (
          <div className={cn("p-2 rounded-full", colorStyles[color].bg, colorStyles[color].text)}>
            {icon}
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className={cn('text-2xl font-bold', valueClassName)}>
              {typeof value === 'number'
                ? new Intl.NumberFormat('vi-VN').format(value)
                : value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className={cn('flex items-center gap-1 mt-1', getTrendColor())}>
                {getTrendIcon()}
                <span className="text-xs font-medium">
                  {trend > 0 ? '+' : ''}
                  {trend}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground">
                    {trendLabel}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Gauge Chart */}
          {showGauge && (
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted/20"
                />
                {/* Progress circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${gaugeValue} 100`}
                  className={gaugeColors[gaugeColor]}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold">{gaugeValue}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Preset variants for common use cases
export function RevenueCard({
  value,
  trend,
  target,
}: {
  value: number
  trend?: number
  target?: number
}) {
  const formattedValue =
    value >= 1_000_000_000
      ? `${(value / 1_000_000_000).toFixed(1)} tỷ`
      : `${(value / 1_000_000).toFixed(0)} tr`

  return (
    <KPICard
      title="Doanh thu"
      value={formattedValue}
      subtitle={target ? `Mục tiêu: ${(target / 1_000_000_000).toFixed(1)} tỷ` : undefined}
      trend={trend}
      trendLabel="so với tháng trước"
      valueClassName="text-green-600"
    />
  )
}

export function ParticipationCard({
  rate,
  total,
  insured,
}: {
  rate: number
  total: number
  insured: number
}) {
  const gaugeColor = rate >= 90 ? 'green' : rate >= 70 ? 'yellow' : 'red'

  return (
    <KPICard
      title="Tỷ lệ tham gia"
      value={`${rate.toFixed(1)}%`}
      subtitle={`${insured.toLocaleString('vi-VN')} / ${total.toLocaleString('vi-VN')} học sinh`}
      showGauge
      gaugeValue={Math.round(rate)}
      gaugeColor={gaugeColor}
    />
  )
}
