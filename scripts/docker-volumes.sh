#!/bin/bash

# Скрипт для управления Docker volumes
# Использование: ./scripts/docker-volumes.sh [команда]

set -e

VOLUME_DB="s4q_db_data"

case "$1" in
  "list")
    echo "📋 Список volumes:"
    docker volume ls | grep s4q || echo "Volumes не найдены"
    ;;
  
  "create")
    echo "🔧 Создание volumes..."
    docker volume create $VOLUME_DB
    echo "✅ Volumes созданы"
    ;;
  
  "remove")
    echo "🗑️ Удаление volumes..."
    docker volume rm $VOLUME_DB 2>/dev/null || echo "Volumes уже удалены"
    echo "✅ Volumes удалены"
    ;;
  
  "backup")
    echo "💾 Создание бэкапа БД..."
    docker-compose exec postgres pg_dump -U postgres s4q_db > backup_$(date +%Y%m%d_%H%M%S).sql
    echo "✅ Бэкап создан"
    ;;
  
  "restore")
    if [ -z "$2" ]; then
      echo "❌ Укажите файл бэкапа: ./scripts/docker-volumes.sh restore backup.sql"
      exit 1
    fi
    echo "📥 Восстановление из бэкапа: $2"
    docker-compose exec -T postgres psql -U postgres s4q_db < "$2"
    echo "✅ Бэкап восстановлен"
    ;;
  
  "info")
    echo "📊 Информация о volumes:"
    echo "PostgreSQL volume:"
    docker volume inspect $VOLUME_DB 2>/dev/null || echo "  Не найден"
    ;;
  
  *)
    echo "🚀 Docker Volumes Manager"
    echo ""
    echo "Команды:"
    echo "  list     - Показать все volumes"
    echo "  create   - Создать volumes"
    echo "  remove   - Удалить volumes"
    echo "  backup   - Создать бэкап БД"
    echo "  restore  - Восстановить из бэкапа"
    echo "  info     - Информация о volumes"
    echo ""
    echo "Примеры:"
    echo "  ./scripts/docker-volumes.sh create"
    echo "  ./scripts/docker-volumes.sh backup"
    echo "  ./scripts/docker-volumes.sh restore backup_20231201_120000.sql"
    ;;
esac
