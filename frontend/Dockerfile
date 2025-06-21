# שלב 1: בניית אפליקציית React
FROM node:20 AS build

# יצירת תיקיית עבודה
WORKDIR /app

# העתקת קבצים
COPY package*.json ./

# התקנת תלויות
RUN npm install

# העתקת שאר הקוד
COPY . .

# בניית גרסה לפרודקשן
RUN npm run build

# שלב 2: שרת Nginx להצגת הבילד
FROM nginx:stable-alpine

# מחיקת קובץ ברירת מחדל של nginx
RUN rm -rf /usr/share/nginx/html/*

# העתקת תוצר הבילד מהמיכל הקודם
COPY --from=build /app/dist /usr/share/nginx/html

# העתקת קובץ קונפיגורציה מותאם אישית ל־nginx (אם יש לך)
# COPY nginx.conf /etc/nginx/nginx.conf

# פתיחת פורט 80
EXPOSE 80

# פקודת הרצה
CMD ["nginx", "-g", "daemon off;"]
