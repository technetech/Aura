export interface Battlecard {
  resumen_ejecutivo: string;
  fortalezas: string[];
  debilidades: string[];
  pricing_actual: {
    detalle: string;
    cambio_vs_periodo_anterior: string;
  };
  mensaje_central_marketing: string;
  movimientos_recientes: string[];
  como_competir: string[];
}

export interface PositioningMap {
  eje_x: { nombre: string; min_label: string; max_label: string };
  eje_y: { nombre: string; min_label: string; max_label: string };
  posiciones: Array<{ empresa: string; x: number; y: number; justificacion: string }>;
  espacios_vacios: string[];
}

export interface ShareOfVoice {
  scores_por_competidor: Record<string, number>;
  desglose_por_canal: Record<string, { organico: number; pagado: number; social: number }>;
  narrativa: string;
}

export interface SentimentTrend {
  sentiment_promedio_periodo: number; // -1 to 1
  tendencia: 'mejorando' | 'empeorando' | 'estable';
  pendiente_semanal: number;
  tema_principal_del_cambio: string;
  citas_representativas: string[];
  alerta: boolean;
}

export interface MomentumScore {
  score: number; // 0-100
  desglose: {
    vacantes: number;
    ads: number;
    pricing: number;
    prensa: number;
  };
  sugerencia: string;
}

export interface VoiceOfCustomer {
  clusters: Array<{
    nombre: string;
    frecuencia_pct: number;
    atendido_por: 'nadie' | 'nosotros' | string | 'todos';
    oportunidad: string;
  }>;
}

export type FrameworkType =
  | 'battlecard'
  | 'positioning_map'
  | 'sov_composite'
  | 'sentiment_trend'
  | 'momentum_score'
  | 'voc_clusters';

export type DataCategory =
  | 'pricing'
  | 'homepage_copy'
  | 'blog'
  | 'reviews'
  | 'social_post'
  | 'job_posting'
  | 'ads'
  | 'press'
  | 'serp';

export type SourceAPI = 'google_search' | 'jina_reader' | 'firecrawl' | 'apify';
